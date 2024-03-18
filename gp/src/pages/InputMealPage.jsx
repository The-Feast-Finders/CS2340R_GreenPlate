import React from 'react';
import NavigationBar from '../components/NavigationBar';
import UserInfo from '../components/UserInfo';
import InputMeal from '../components/InputMeal';
import './styles/InputMeal.css';

const InputMealPage = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Input Meal</h1>
                <div className='container'>
                    <UserInfo /> {/* Renders user information along with the BMR */}
                    <InputMeal /> {/* Component for inputting meals */}
                </div>
            </div>
        </div>
    );
};

export default InputMealPage;
