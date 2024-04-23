import React, { useState } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

const InputMeal = ({ user }) => {
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user) {
            const mealData = {
                name: mealName,
                calories: parseInt(calories, 10),
                timestamp: Timestamp.fromDate(new Date())
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
    };


    return (
        <form onSubmit={handleSubmit} class="meal-form">
            <div class="form-group">
                <label htmlFor="mealName">Meal Name:</label>
                <input
                    type="text"
                    id="mealName"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    required
                    class="form-control"
                />
            </div>
            <div class="form-group">
                <label htmlFor="calories">Calories:</label>
                <input
                    type="number"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                    class="form-control"
                />
            </div>
            <button type="submit" class="submit-btn">Add Meal</button>
        </form>
    );
};

export default InputMeal;
