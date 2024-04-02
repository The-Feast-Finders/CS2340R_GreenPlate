import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RecipeList = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [pantry, setPantry] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const querySnapshot = await getDocs(collection(db, 'cookbook'));
            const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
        };

        const fetchPantry = async () => {
            if (user) {
                const pantryRef = collection(db, 'pantry', user.uid, 'ingredients');
                const querySnapshot = await getDocs(pantryRef);
                const pantryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPantry(pantryData);
            }
        };

        

        fetchRecipes();
        fetchPantry();
    }, [user, db]);

    const canMakeRecipe = (recipe) => {
        return recipe.ingredients.every(ingredient => {
            const pantryItem = pantry.find(pantryItem => pantryItem.ingredient.toLowerCase() === ingredient.name.toLowerCase());
            console.log(`Checking ingredient: ${ingredient.name}, Available: ${pantryItem ? pantryItem.quantity : 'none'}`);
    
            return pantryItem && pantryItem.quantity >= ingredient.quantity;
        });
    };

    return (
        <div>
            <h2>Recipe List</h2>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)}>
                        <p style={canMakeRecipe(recipe) ? { color: 'green' } : null}>{recipe.name}</p>
                        {selectedRecipeId === recipe.id && (
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name} - {ingredient.quantity}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
