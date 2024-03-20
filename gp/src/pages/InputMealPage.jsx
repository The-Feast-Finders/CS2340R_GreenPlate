import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavigationBar from '../components/NavigationBar';
import UserInfo from '../components/UserInfo';
import InputMeal from '../components/InputMeal';
import PieGraph from '../components/PieGraph';
import BarGraph from '../components/BarGraph';
import './styles/InputMeal.css';

const InputMealPage = () => {
    const [user, setUser] = useState(null);
    const [activeGraph, setActiveGraph] = useState(null); // Initialize to null

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const renderGraph = () => {
        if (activeGraph === 'pie') {
            return <PieGraph user={user} />;
        } else if (activeGraph === 'bar') {
            return <BarGraph user={user} />;
        }
        return null; // No graph is rendered if activeGraph is null
    };

    return (
        <div>
            <NavigationBar />
            <div className='frame'>
                <div class="header-container">
                    <h1>Input Your Meal Here!</h1>
                </div>
                <div className='container'>
                    <UserInfo user={user} />
                    <InputMeal user={user} />

                    <div className="graph-buttons">
                        <button onClick={() => setActiveGraph('pie')}>Pie Graph</button>
                        <button onClick={() => setActiveGraph('bar')}>Bar Graph</button>
                    </div>

                    {renderGraph()}
                </div>
            </div>
        </div>
    );
};

export default InputMealPage;
