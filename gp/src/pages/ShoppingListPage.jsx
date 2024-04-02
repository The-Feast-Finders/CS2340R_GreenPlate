import React from 'react';
import NavigationBar from '../components/NavigationBar';

const ShoppingList = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Shopping List</h1>
                <p>Welcome to the Shopping List</p>
            </div>
        </div>
    );
};

export default ShoppingList;