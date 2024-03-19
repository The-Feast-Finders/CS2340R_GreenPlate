import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavigationBar from '../components/NavigationBar';
import UserInfo from '../components/UserInfo';
import InputMeal from '../components/InputMeal';
import PieGraph from '../components/PieGraph';
import './styles/InputMeal.css';

const InputMealPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <NavigationBar />
            <div className='frame'>
                <h1>Input Meal</h1>
                <div className='container'>
                    <UserInfo user={user} /> {/* Pass user as prop if needed */}
                    <InputMeal user={user} /> {/* Pass user as prop to InputMeal */}
                    <PieGraph user={user} /> {/* Pass user as prop to PieGraph if needed */}
                </div>
            </div>
        </div>
    );
};

export default InputMealPage;