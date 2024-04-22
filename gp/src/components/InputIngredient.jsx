import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const InputIngredient = ({ user }) => {
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [calories, setCalories] = useState('');
    const [expDate, setExpDate] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const db = getFirestore();

    // Toggle the form view
    const toggleForm = () => setShowForm(!showForm);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset error message
        setError('');

        // Validate the quantity
        const quantityNum = parseInt(quantity, 10);
        if (quantityNum <= 0) {
            setError('Quantity must be a positive number.');
            return;
        }

        if (user) {
            const pantryRef = collection(db, 'pantry', user.uid, 'ingredients');

            // Check if the ingredient already exists with a nonzero quantity
            const q = query(pantryRef, where("ingredient", "==", ingredientName));
            const querySnapshot = await getDocs(q);

            let ingredientExists = false;
            querySnapshot.forEach((doc) => {
                if (doc.data().quantity > 0) {
                    ingredientExists = true;
                }
            });

            if (ingredientExists) {
                setError('This ingredient already exists in your pantry with a nonzero quantity.');
                return;
            }

            // If the ingredient doesn't exist, add it to the user's pantry
            const ingredientData = {
                ingredient: ingredientName,
                quantity: quantityNum,
                calories: parseInt(calories, 10),
                expDate: expDate ? Timestamp.fromDate(new Date(expDate)) : null
            };

            try {
                await addDoc(pantryRef, ingredientData);
                toggleForm(); // Close the form
            } catch (error) {
                setError('Error adding ingredient to pantry.');
            }
            window.location.reload();
        }
    }


    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ingredientName">Ingredient Name:</label>
                        <input id="ingredientName" type="text" value={ingredientName} style={{width: '200px', marginBottom: '10px'}} onChange={(e) => setIngredientName(e.target.value)} className="your-css-class" />

                        <label htmlFor="quantity">Quantity:</label>
                        <input id="quantity" type="number" value={quantity} style={{width: '100px'}} onChange={(e) => setQuantity(e.target.value)} className="your-css-class" />

                        <label htmlFor="calories">Calories:</label>
                        <input id="calories" type="number" value={calories} style={{width: '100px'}} onChange={(e) => setCalories(e.target.value)} className="your-css-class" />

                        <label htmlFor="expDate">Expiration Date (optional):</label>
                        <input id="expDate" type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="your-css-class" />
                    </div>
                    
                    <div className='content-container' style={{gap: '10px'}}>
                        <button type="submit" style={{width: '125px'}} className="your-submit-btn-class">Add Ingredient</button>
                        <button type="button" style={{width: '125px'}} onClick={toggleForm} className="your-cancel-btn-class">Cancel</button>
                    </div>

                    {error && <p className="your-error-class">{error}</p>}
                </form>
            ) : (
                <button onClick={toggleForm} className="your-add-ingredient-btn-class">Add Ingredient</button>
            )}
        </div>
    );
}

export default InputIngredient;
