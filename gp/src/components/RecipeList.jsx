import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

    const toggleFilterMakeable = () => {
        setFilterMakeable(!filterMakeable);
    };

    return (
        <div>
            <h2>Recipe List</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '12px 6px' }} onClick={sortRecipesAlphabetically}>Sort Alphabetically</button>
                <button style={{ flex: 1, padding: '12px 1px' }} onClick={toggleFilterMakeable}>
                    {filterMakeable ? 'Show All Recipes' : 'Show Available Recipes'}
                </button>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)}>
                        <p style={canMakeRecipe(recipe) ? { color: 'green' } : null}>{recipe.name}</p>
                        {selectedRecipeId === recipe.id && (
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.name} - Quantity: {ingredient.quantity}
                                    </li>
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
