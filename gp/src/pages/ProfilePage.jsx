import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavigationBar from '../components/NavigationBar';
import UserInfo from '../components/UserInfo';
import './styles/ProfilePage.css';
import InputData from '../components/InputData'

const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setCurrentUser(user);
            } else {
                // No user is signed in, handle accordingly (e.g., redirect to login)
                setCurrentUser(null);
            }
        });

        // Cleanup subscription on unmount
        // return () => unsubscribe();
    }, []);

    const logout = () => {
        localStorage.removeItem('userToken'); // Assuming you store a token
        window.location.href = '/login';
    };

    return (
        <div>
            <NavigationBar />
            <div className="profile-page">
                <div className="header-container">
                    <h1 className="ProfileTitle">Welcome to your Profile!</h1>
                    <a onClick={logout} className="logout-link">Logout</a>
                </div>
                <div className="user-data-container" style={{gap: '100px'}}>
                    <div className='left-container'>
                        {currentUser ? <UserInfo user={currentUser} /> : <p>Loading user data...</p>}
                    </div>
                    <div className='right-container'>
                        <InputData user={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
