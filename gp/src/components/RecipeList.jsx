import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const querySnapshot = await getDocs(collection(db, 'cookbook'));
            const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipe List</h2>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => {/* handle recipe click */}}>
                        <p>{recipe.name}</p>
                        {/* Add visual indication for ingredients availability */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
