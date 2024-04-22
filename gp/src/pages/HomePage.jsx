import React from 'react';
import firebase from '../firebase.js';
import './styles/NavigationBar.css'
import './styles/HomePage.css'
import NavigationBar from '../components/NavigationBar.jsx';



const HomePage = () => {
    return (
        <div>
            <NavigationBar />
            <div className="homePageContent" style={{ textAlign: 'center' }}>
                <h1 className="main-title">Welcome to GreenPlate!</h1>
                <p className="description">At GreenPlate, we believe that a healthier lifestyle starts on your plate. Our app is your dedicated companion in the world of health and nutrition, helping you track your calorie intake and meals with ease and insight.</p>
                <img src="gpicon.png" alt="GreenPlate Icon" style={{width: '300px', marginBottom: '10px'}} />
            </div>
        </div>
    );
};

export default HomePage;
