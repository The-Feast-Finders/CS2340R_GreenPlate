import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyCaloriesBarGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            // Define the start of the week (last 7 days)
            const end = new Date();
            const start = new Date(end);
            start.setDate(start.getDate() - 7); // Adjust to get the last 7 days

            const mealsRef = collection(db, 'meals');
            const q = query(
                mealsRef,
                where("userId", "==", user.uid),
                where("timestamp", ">=", start),
                where("timestamp", "<=", end)
            );

            const unsubscribe = onSnapshot(q, querySnapshot => {
                const mealsFromLastWeek = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    timestamp: doc.data().timestamp.toDate() // Assuming timestamp is a Firestore Timestamp
                }));

                // Group meals by day and sum calories
                const caloriesByDay = mealsFromLastWeek.reduce((acc, meal) => {
                    const day = meal.timestamp.toLocaleDateString();
                    acc[day] = (acc[day] || 0) + meal.calories;
                    return acc;
                }, {});

                // Prepare chart data
                const labels = Object.keys(caloriesByDay);
                const data = Object.values(caloriesByDay);
                const backgroundColors = labels.map((_, index) => `hsl(${index / labels.length * 360}, 70%, 50%)`);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Daily Calorie Intake',
                        data,
                        backgroundColor: backgroundColors,
                    }]
                });
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [user, db]);

    return (
        <div>
            <h3>Weekly Calorie Intake</h3>
            {chartData && chartData.datasets.length > 0 ? (
                <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default WeeklyCaloriesBarGraph;