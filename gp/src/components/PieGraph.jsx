import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PieGraph = () => {
    const [mealData, setMealData] = useState([]);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const end = new Date();
            const start = new Date(end.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago

            const mealsRef = collection(db, 'meals');
            const q = query(
                mealsRef,
                where("userId", "==", user.uid),
                where("timestamp", ">=", start),
                where("timestamp", "<=", end)
            );

            getDocs(q)
                .then(querySnapshot => {
                    const mealsFromLastDay = querySnapshot.docs.map(doc => {
                        const meal = doc.data();
                        console.log(`Meal: ${meal.name}, Calories: ${meal.calories}`); // Debugging output
                        return { ...meal, id: doc.id };
                    });
                    setMealData(mealsFromLastDay);
                })
                .catch(error => {
                    console.error("Error fetching meals: ", error);
                });
        }
    }, [user, db]);

    // The rest of your component rendering the chart with mealData

    return (
        <div>
            <h3>Calorie Intake by Meal</h3>
            {/* The chart will be rendered here using mealData */}
        </div>
    );
};

export default PieGraph;
