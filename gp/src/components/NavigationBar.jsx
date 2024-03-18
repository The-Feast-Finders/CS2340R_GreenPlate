import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles/NavigationBar.css'; // Import CSS for styling

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <Link to="/home">Home</Link>
            <Link to="/input-meal">Input Meal</Link>
            <Link to="/recipe">Recipe</Link>
            <Link to="/ingredient">Ingredient</Link>
            <Link to="/shopping-list">Shopping List</Link>
        </nav>
    );
};

export default NavigationBar;