import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp, getDocs, query, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import { sortAlphabetically, filterByMakeable } from '../strategies/recipeStrategies';
import { useRecipeStrategy } from '../hooks/useRecipeStrategy';

const RecipeList = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [pantry, setPantry] = useState([]);
    const [filterMakeable, setFilterMakeable] = useState(false);
    const [isSorted, setIsSorted] = useState(false);  // State to track sorting
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

        return () => {
            unsubscribeRecipes();
            unsubscribePantry();
        };
    }, [user, db]);

    const toggleSort = () => {
        if (!isSorted) {
            setRecipes(sortAlphabetically(recipes));
            setIsSorted(true);
        } else {
            setRecipes(recipes.slice().reverse()); // Simple toggle to revert sorting
            setIsSorted(false);
        }
    };

    const toggleFilterMakeable = () => {
        setFilterMakeable(!filterMakeable);
    };

    const filteredRecipes = useMemo(() => {
        if (!Array.isArray(recipes) || recipes.length === 0) {
            return [];
        }
        const strategy = filterMakeable ? (recipes) => filterByMakeable(isSorted ? sortAlphabetically(recipes) : recipes, pantry) : (isSorted ? sortAlphabetically : (r) => r);
        return strategy(recipes);
    }, [recipes, pantry, filterMakeable, isSorted]);

    return (
        <div>
            <div className="header-container" style={{ textAlign: 'center', justifyContent: 'center'}}>
                <h2>Recipe List</h2>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={toggleSort}>Toggle Alphabetical Sort</button>
                <button style={{ width: '250px', fontWeight: 'bold' }} onClick={toggleFilterMakeable}>
                    {filterMakeable ? 'Show All Recipes' : 'Show Available Recipes'}
                </button>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)}>
                        <p style={{ color: recipe.ingredients.every(ingredient => {
                            const item = pantry.find(pItem => pItem.ingredient.toLowerCase() === ingredient.name.toLowerCase());
                            return item && item.quantity >= ingredient.quantity;
                        }) ? 'green' : 'black', fontWeight: selectedRecipeId === recipe.id ? 'bold' : 'normal' }}>
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
                                {/* Additional UI and buttons to handle the recipes */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
