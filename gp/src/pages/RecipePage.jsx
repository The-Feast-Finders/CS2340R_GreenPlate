import React from 'react';
import NavigationBar from '../components/NavigationBar';
import '../pages/styles/RecipePage.css'

const RecipePage = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Recipe Page</h1>
                <p>Welcome to the Recipe Page!</p>
            </div>
        
        </div>
    );
};

export default RecipePage;