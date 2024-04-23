import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const InputShop = ({ user }) => {
    // State variables
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [calories, setCalories] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

    const db = getFirestore();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const parsedQuantity = parseInt(quantity, 10);
        const parsedCalories = parseInt(calories, 10);

        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            setError('Quantity must be a positive number.');
            return;
        }

        if (isNaN(parsedCalories) || parsedCalories <= 0) {
            setError('Calories must be a positive number.');
            return;
        }

        if (name.trim() === '') {
            setError('Ingredient name is required.');
            return;
        }

        if (user) {
            const shopRef = collection(db, 'shoppingList', user.uid, 'ingredients');
            const q = query(shopRef, where("ingredient", "==", name.trim()));
            const querySnapshot = await getDocs(q);

            let ingredientExists = false;
            querySnapshot.forEach((doc) => {
                if (doc.data().quantity > 0) {
                    ingredientExists = true;
                }
            });

            if (ingredientExists) {
                setError("This ingredient is already added to your shopping list");
                return;
            }

            const ingredientData = {
                ingredient: name.trim(),
                quantity: parsedQuantity,
                calories: parsedCalories,
                expDate: null
            };

            try {
                await addDoc(shopRef, ingredientData);
                setSuccess('Ingredient successfully added to your shopping list!');
                setName('');
                setQuantity('');
                setCalories('');
                window.location.reload();
            } catch (error) {
                setError('Could not add ingredient to list');
            }
        }
    };

    return (
        <div>
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="your-toggle-btn-class">
                {isFormVisible ? 'Hide Form' : 'Add New Ingredient'}
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ingredientName">Ingredient Name:</label>
                        <input id="ingredientName" type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '300px', marginBottom: '20px', height: '25px' }} className="your-css-class" />

                        <label htmlFor="quantity">Quantity:</label>
                        <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: '100px' }} className="your-css-class" />

                        <label htmlFor="calories">Calories:</label>
                        <input id="calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} style={{ width: '100px' }} className="your-css-class" />
                    </div>
                    <button type="submit" className="your-submit-btn-class">Add Ingredient</button>
                    {error && <p className="your-error-class">{error}</p>}
                    {success && <p className="your-success-class">{success}</p>}
                </form>
            )}


        </div>
    );
}

export default InputShop;
