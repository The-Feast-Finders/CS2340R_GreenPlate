import React from 'react';
import NavigationBar from '../components/NavigationBar';
import '../pages/styles/InputMeal.css'

const InputMeal = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Input Meal</h1>
                <p>Welcome to the Input Meal screen!</p>
            </div>
        
        </div>
    );
};

export default InputMeal;