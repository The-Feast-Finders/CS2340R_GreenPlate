import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import './styles/LogRegPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegistrationPage = () => {
    const auth = getAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User registration successful
            const user = userCredential.user;

            // Save the user's info to localStorage
            localStorage.setItem('user', JSON.stringify({
                email: user.email,
                uid: user.uid
                // You can add more user details here if needed
            }));

            // Fetch the token and save it
            user.getIdToken().then(token => {
                localStorage.setItem('token', token);
                navigate('/home'); // Navigate to home after successful registration and storage
            });
        })
        .catch((error) => {
            // Registration failed, set error message
            setError('Registration failed: ' + error.message);
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Register</h1>
                {error && <div className="login-error">{error}</div>}
                <RegistrationForm onRegister={handleRegister} className="login-form" />
            </div>
        </div>
    );
};

export default RegistrationPage;
