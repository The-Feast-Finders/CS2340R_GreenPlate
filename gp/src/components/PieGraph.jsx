import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

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

            const unsubscribe = onSnapshot(q, querySnapshot => {
                const mealsFromLastDay = querySnapshot.docs.map(doc => {
                    const meal = doc.data();
                    return { ...meal, id: doc.id };
                });
                if (mealsFromLastDay.length > 0) {
                    const newChartData = {
                        labels: mealsFromLastDay.map(meal => meal.name),
                        datasets: [{
                            data: mealsFromLastDay.map(meal => meal.calories),
                            backgroundColor: mealsFromLastDay.map((_, i) => `hsl(${i / mealsFromLastDay.length * 360}, 60%, 60%)`),
                            hoverOffset: 4
                        }]
                    };
                    setChartData(newChartData);
                }
            }, error => {
                console.error("Error fetching meals: ", error);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [user, db]);

    return (
        <div>
            <h3>Calorie Intake by Meal</h3>
            {chartData && chartData.datasets.length > 0 ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default PieGraph;
