import React from 'react';
import NavigationBar from '../components/NavigationBar';
import '../pages/styles/HomePage.css'

const HomePage = () => {
    return (
        <div>
            <NavigationBar />
            <div className='frame'> 
                <h1>Home Screen</h1>
                <p>Welcome to the Home Screen!</p>
            </div>
        
        </div>
    );
};

export default HomePage;