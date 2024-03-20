import React from 'react';
import NavigationBar from '../components/NavigationBar';
import PieGraph from '../components/PieGraph';


const RecipePage = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Recipe Page</h1>
                <p>Welcome to the Recipe Page!</p>
            </div>
            <PieGraph />
        
        </div>
    );
};

export default RecipePage;