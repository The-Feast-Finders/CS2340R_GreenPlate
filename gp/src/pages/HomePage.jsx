import React from 'react';
import firebase from '../firebase.js';
import './styles/NavigationBar.css'
import './styles/HomePage.css'
import NavigationBar from '../components/NavigationBar.jsx';



const HomePage = () => {
    return (
        <div><NavigationBar />
            <div className='frame'>
                <h1>Welcome to Our Application!</h1>
                <p>This is the home page of our awesome app. Here, you can find various features and information. Feel free to explore and enjoy our services.</p>
                {/* Add more content here as needed */}
            </div>
        </div>
    );
};

export default HomePage;
