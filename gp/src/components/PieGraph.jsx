import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieGraph = () => {
    const [mealData, setMealData] = useState([]);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            // Assuming you're storing the date as UTC, let's use it to find the start of the current day in UTC
            const now = new Date();
            const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            const mealsRef = collection(db, 'meals');
            // Firestore uses the end of the range as exclusive, hence we query using the start of the next day
            const startOfNextDay = new Date(startOfToday).setDate(startOfToday.getDate() + 1);

            const q = query(
                mealsRef,
                where("userId", "==", user.uid),
                where("timestamp", ">=", startOfToday),
                where("timestamp", "<", startOfNextDay)
            );

            getDocs(q)
                .then(querySnapshot => {
                    const meals = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    processMealData(meals);
                })
                .catch(error => console.error("Error fetching meals: ", error));
        }
    }, [user, db]);

    const processMealData = (meals) => {
        const mealCalories = meals.reduce((acc, meal) => {
            // Group by meal name and sum up the calories
            const { name, calories } = meal;
            acc[name] = (acc[name] || 0) + calories;
            return acc;
        }, {});

        setMealData(Object.entries(mealCalories).map(([name, calories]) => ({ name, calories })));
    };

    const data = {
        labels: mealData.map(meal => meal.name),
        datasets: [
            {
                label: 'Calories per Meal',
                data: mealData.map(meal => meal.calories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    // More colors as needed
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    // More border colors as needed
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h3>Calorie Intake by Meal</h3>
            <Pie data={data} />
        </div>
    );
};

export default PieGraph;
