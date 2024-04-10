import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';

const RecipeList = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [pantry, setPantry] = useState([]);
    const [filterMakeable, setFilterMakeable] = useState(false); // State to manage filtering
    const db = getFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const querySnapshot = await getDocs(collection(db, 'cookbook'));
            const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
        };

        const fetchPantry = async () => {
            if (user) {
                const pantryRef = collection(db, `pantry/${user.uid}/ingredients`);
                const querySnapshot = await getDocs(pantryRef);
                const pantryData = querySnapshot.docs.map(doc => doc.data());
                setPantry(pantryData);
            }
        };

        fetchRecipes();
        fetchPantry();
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
        //Remove ingredients from pantry
        for (const ingredient of recipe.ingredients) {
            const pantryItem = pantry.find(pantryIngredient => pantryIngredient.ingredient.toLowerCase() === ingredient.name.toLowerCase());
        
            if (!pantryItem) {
                console.log(`Ingredient ${ingredient.name} not found in pantry.`);
                continue; // Skip to next iteration if ingredient not found in pantry
            }
        
            const newQuantity = pantryItem.quantity - ingredient.quantity;
        
            const ingredientData = {
                ingredient: ingredient.name,
                quantity: newQuantity >= 0 ? newQuantity : 0, // Ensure quantity doesn't go below 0
                calories: ingredient.calories,
                expDate: ingredient.expDate
            };
        
            try {
                const pantryRef = collection(db, 'pantry', user.uid, 'ingredients', pantryItem.id); // Assuming pantryItem has an id field
                await setDoc(pantryRef, ingredientData);
                console.log(`Pantry updated for ingredient: ${ingredient.name}`);
            } catch (error) {
                console.error('Error updating pantry:', error);
            }
        }

        //Add meal to database
        if (user) {
            const mealData = {
                name: recipe.name,

                //add calories from recipe when added to database!!!
                calories: 10,
                timestamp: Timestamp.fromDate(new Date()) // Save the current time as a Firestore Timestamp
            };

            // Update user's meal array
            const userRef = doc(getFirestore(), 'users', user.uid);
            await setDoc(userRef, { meals: mealData }, { merge: true });

            // Add meal to general meals collection
            const mealsRef = collection(getFirestore(), 'meals');
            await addDoc(mealsRef, { ...mealData, userId: user.uid });

            console.log('Meal added successfully');

            // Reload the page
            window.location.reload();
        } else {
            console.log('User is not logged in');
        }
    }

    const addMissingIngredients = (recipe) => {
        recipe.ingredients.every(ingredient => {
            const pantryItem = pantry.find(pantryIngredient => pantryIngredient.ingredient.toLowerCase() === ingredient.name.toLowerCase());
            if (pantryItem) {
                //add ingredient.quantity - pantryItem.quantity to shopping list
            } else {
                //add ingredient with ingredient.quantity to shopping list
            }
        });

        //send confirmation
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
                                            <button onClick={()=>makeRecipe(recipe)}>Make Recipe</button>
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
