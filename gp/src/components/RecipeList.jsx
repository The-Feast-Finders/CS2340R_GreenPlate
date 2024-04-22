import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp, getDocs, query, where, deleteDoc, onSnapshot} from 'firebase/firestore';

const RecipeList = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [pantry, setPantry] = useState([]);
    const [filterMakeable, setFilterMakeable] = useState(false); // State to manage filtering
    const db = getFirestore();

    useEffect(() => {
        const recipesRef = collection(db, 'cookbook');
        const unsubscribeRecipes = onSnapshot(recipesRef, (querySnapshot) => {
            const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
        });
    
        let unsubscribePantry = () => {};
        if (user) {
            const pantryRef = collection(db, `pantry/${user.uid}/ingredients`);
            unsubscribePantry = onSnapshot(pantryRef, (querySnapshot) => {
                const pantryData = querySnapshot.docs.map(doc => doc.data());
                setPantry(pantryData);
            });
        }
    
        // Cleanup function to unsubscribe from the snapshots when the component unmounts
        return () => {
            unsubscribeRecipes();
            unsubscribePantry();
        };
    }, [user, db]);
    


    const canMakeRecipe = (recipe) => {
        return recipe.ingredients.every(ingredient => {
            const pantryItem = pantry.find(pantryIngredient => pantryIngredient.ingredient.toLowerCase() === ingredient.name.toLowerCase());
            return pantryItem && pantryItem.quantity >= ingredient.quantity;
        });
    };

    const filteredRecipes = useMemo(() => {
        return filterMakeable ? recipes.filter(canMakeRecipe) : recipes;
    }, [recipes, pantry, filterMakeable]);

    const sortRecipesAlphabetically = () => {
        const sortedRecipes = [...recipes].sort((a, b) => a.name.localeCompare(b.name));
        setRecipes(sortedRecipes);
    };

    const makeRecipe = async (recipe) => {
        if (!user || !user.uid) {
            console.error('User is not logged in or user ID is undefined');
            alert('You must be logged in to cook a recipe.');
            return;
        }
    
        try {
            const db = getFirestore();
            const pantryRef = collection(db, `pantry/${user.uid}/ingredients`);
            
            for (const ingredient of recipe.ingredients) {
                const q = query(pantryRef, where("ingredient", "==", ingredient.name.toLowerCase().trim()));
                const querySnapshot = await getDocs(q);
    
                let pantryItem = null;
                querySnapshot.forEach(doc => {
                    if (doc.data().quantity > 0) {
                        pantryItem = { id: doc.id, ...doc.data() };
                    }
                });
    
                if (!pantryItem) {
                    console.log(`Ingredient ${ingredient.name} not found in pantry or missing ID.`);
                    continue; // Skip to next iteration if ingredient not found in pantry
                }
    
                const newQuantity = Math.max(0, pantryItem.quantity - ingredient.quantity);
                if (newQuantity > 0) {
                    const ingredientData = {
                        ingredient: ingredient.name,
                        quantity: newQuantity,
                        calories: pantryItem.calories,
                        expDate: pantryItem.expDate
                    };
                    await setDoc(doc(pantryRef, pantryItem.id), ingredientData);
                    console.log(`Pantry updated for ingredient: ${ingredient.name}`);
                } else {
                    await deleteDoc(doc(pantryRef, pantryItem.id)); // Delete the document if quantity is 0
                    console.log(`Pantry item for ${ingredient.name} deleted as quantity went to zero.`);
                }
            }
    
            const totalCalories = recipe.ingredients.reduce((acc, ingredient) => {
                const pantryItem = pantry.find(item => item.ingredient.toLowerCase() === ingredient.name.toLowerCase());
                return acc + (pantryItem ? pantryItem.calories * ingredient.quantity : 0);
            }, 0);
    
            if (totalCalories > 0) {
                const mealData = {
                    name: recipe.name,
                    calories: totalCalories,
                    timestamp: Timestamp.fromDate(new Date())
                };
    
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { meals: mealData }, { merge: true });
    
                const mealsRef = collection(db, 'meals');
                await addDoc(mealsRef, { ...mealData, userId: user.uid });
                
                alert('Meal added successfully! Reloading the page...');
                window.location.reload();
            } else {
                console.log('No valid ingredients found for the recipe.');
            }
        } catch (error) {
            console.error('Error making recipe:', error);
            alert(`Failed to make recipe. Please try again. Error: ${error.message}`);
        }
    }
    

    // method made 
    const addMissingIngredients = async (recipe) => {
        //check to see if user logged in. 
        if (!user) {
            console.error('User is not logged in');
            alert('You must be logged in to add ingredients.');
            return;
        }
    
        for (const ingredient of recipe.ingredients) {
            const pantryItem = pantry.find(pantryIngredient => pantryIngredient.ingredient.toLowerCase() === ingredient.name.toLowerCase());
    
            const requiredQuantity = pantryItem ? Math.max(0, ingredient.quantity - pantryItem.quantity) : ingredient.quantity;
            if (requiredQuantity <= 0) continue; // Skip if no additional quantity is needed
    
            const shoppingListRef = collection(db, `shoppingList/${user.uid}/ingredients`);
            const q = query(shoppingListRef, where("ingredient", "==", ingredient.name.toLowerCase()));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                // Update existing quantity
                await Promise.all(querySnapshot.docs.map(doc => {
                    const existingQuantity = doc.data().quantity || 0;
                    const newQuantity = existingQuantity + requiredQuantity;
                    return setDoc(doc.ref, { quantity: newQuantity }, { merge: true });
                }));
            } else {
                // Add a new ingredient to the shopping list
                await addDoc(shoppingListRef, {
                    ingredient: ingredient.name,
                    quantity: requiredQuantity
                });
            }
        };
    
        alert("Ingredients added to the shopping list successfully!");
    }

    const toggleFilterMakeable = () => {
        setFilterMakeable(!filterMakeable);
    };

    return (
        <div>
            <div className="header-container" style={{ textAlign: 'center', justifyContent: 'center'}}>
                <h2>Recipe List</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={sortRecipesAlphabetically}>Sort Alphabetically</button>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={toggleFilterMakeable}>
                    {filterMakeable ? 'Show All Recipes' : 'Show Available Recipes'}
                </button>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)}>
                        <p style={{ ...(canMakeRecipe(recipe) ? { color: 'green' } : null),
                                    ...(selectedRecipeId === recipe.id ? { fontWeight: 'bold' } : null) }}>
                            {recipe.name}
                        </p>
                        {selectedRecipeId === recipe.id && (
                            <div>
                                <ul style={{ marginLeft: '100px', paddingLeft: '10px', marginRight: '100px'}}>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient.name} - Quantity: {ingredient.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    {canMakeRecipe(recipe) ? (
                                            <button onClick={()=>makeRecipe(recipe)}>Cook Recipe</button>
                                        ) : (
                                            <button onClick={()=>addMissingIngredients(recipe)}>Add Missing Ingredients</button>
                                    )}
                                    <br /><br />
                                </div>                            
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
