import React, { useState } from 'react';
import { getFirestore, doc, setDoc, collection, Timestamp } from 'firebase/firestore';

const InputRecipe = () => {
    // Each recipe needs a name an list of ingredients
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const db = getFirestore();


    const isValidIngredient = (ingredient) => {
        return ingredient.name.trim() !== '' && !isNaN(ingredient.quantity) && ingredient.quantity > 0;
    };

    // Functions to handle changes 
    const handleIngredientNameChange = (index, newName) => {
        setIngredients(prevIngredients => prevIngredients.map((ingredient, i) =>
            i === index ? { ...ingredient, name: newName } : ingredient
        ));
    }

    const handleRecipeNameChange = (newName) => {
        setRecipeName(newName);
    }

    const handleIngredientQuantityChange = (index, newQuantity) => {
        setIngredients(prevIngredients => prevIngredients.map((ingredient, i) =>
            i === index ? { ...ingredient, quantity: newQuantity } : ingredient
        ));
    }

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    }

    const removeIngredient = (index) => {
        setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (recipeName.trim() === '' || !ingredients.every(isValidIngredient) || ingredients.length === 0) {
            return;
        }
    
        try {
            const newRecipeRef = doc(collection(db, 'cookbook')); // Creates a new document reference with a unique ID
            await setDoc(newRecipeRef, {
                name: recipeName,
                ingredients: ingredients,
                createdAt: Timestamp.fromDate(new Date()) // Optional: Store creation time
            });
    
            setRecipeName('');
            setIngredients([]);
            window.location.reload()
            alert('Recipe saved successfully!');
            
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Error saving recipe.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h2>Add Recipe</h2>
            <div>
                <label htmlFor="recipeName">Recipe Name:</label>
                <input type="text" id="recipeName" value={recipeName}
                    onChange={(event) => handleRecipeNameChange(event.target.value)} />
            </div>

            <h3>Ingredients</h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        <input type="text" placeholder="Ingredient Name" value={ingredient.name}
                            onChange={(e) => handleIngredientNameChange(index, e.target.value)} />
                        <input type="text" placeholder="Quantity" value={ingredient.quantity}
                            onChange={(e) => handleIngredientQuantityChange(index, e.target.value)} />
                        <button onClick={() => removeIngredient(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={addIngredient}>Add Ingredient</button>
            <button type="submit">Save Recipe</button>
        </form>

    );


}

export default InputRecipe;