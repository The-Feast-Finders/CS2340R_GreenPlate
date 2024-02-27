// MenuBar.js
import React from 'react';
import './MenuBar.css';

const MenuBar = () => {
    return (
        <nav className="menu-bar">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    );
};

export default MenuBar;
