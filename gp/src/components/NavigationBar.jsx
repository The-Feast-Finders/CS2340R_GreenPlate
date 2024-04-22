import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles/NavigationBar.css'; // Import CSS for styling

const NavigationBar = () => {
    return (
        <nav className="navigation-bar" data-testid="navigation-bar">
            <div className="nav-logo">
                <a href="/home">
                    <img src="./gpicon.png" alt="Logo" />
                </a>
            </div>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/input-meal">Input Meal</Link>
                <Link to="/recipe">Recipe</Link>
                <Link to="/ingredient">Ingredient</Link>
                <Link to="/shopping-list">Shopping List</Link>
            </div>
            <div className="nav-profile">
                <Link to="/profile">
                    <img src="./profile.jpeg" alt="Profile" />
                </Link>
            </div>
        </nav>
    );
};

export default NavigationBar;