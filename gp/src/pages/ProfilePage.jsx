import React from 'react';
import './styles/ProfilePage.css'
import NavigationBar from '../components/NavigationBar';
import InputData from '../components/InputData'

const ProfilePage = ({ userData, onUpdate }) => {
    // userData should contain the user's information such as meals, height, etc.
    // onUpdate is a function that would be called to update the user's information.
    const logout = () => {
        // Remove the token from local storage
        localStorage.removeItem('userToken');
      
        // Redirect to the login page or home page
        window.location.href = '/login'; // or wherever you want to redirect after logout
      };

    return (
        <div>
            <NavigationBar />
            <div className="profile-page">
                <h1>Welcome to Your Profile!</h1>
                <InputData />
            </div>
            <div className="logout-button-container">
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;
