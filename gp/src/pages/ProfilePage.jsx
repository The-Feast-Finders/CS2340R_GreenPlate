import React from 'react';
import './styles/ProfilePage.css'
import NavigationBar from '../components/NavigationBar';

const ProfilePage = ({ userData, onUpdate }) => {
    // userData should contain the user's information such as meals, height, etc.
    // onUpdate is a function that would be called to update the user's information.

    return (
        <div className="profile-page">
            <h1>Welcome to Your Profile!</h1>
            <div className="user-info">
                <p>This is where your user information will be available.</p>
                {/* <p><strong>Meals:</strong> {userData.meals.join(', ')}</p>
                <p><strong>Height:</strong> {userData.height} cm</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Weight:</strong> {userData.weight} kg</p> */}
            </div>
            <button onClick={onUpdate}>Update My Information</button>
            {/* You can also pass specific data to the onUpdate function if needed */}
        </div>
    );
};

export default ProfilePage;
