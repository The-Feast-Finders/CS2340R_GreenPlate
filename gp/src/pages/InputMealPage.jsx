import React from 'react';
import NavigationBar from '../components/NavigationBar';
//import './styles/InputMeal.css'
import InputMeal from '../components/InputMeal';

const InputMealPage = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'>
                <h1>Input Meal</h1>
                <p>Welcome to the Input Meal screen!</p>
            </div>
            <InputMeal />
        </div>
    );
};

export default InputMealPage;