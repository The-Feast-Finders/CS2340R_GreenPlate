import React from 'react';
import LoginForm from '../components/LoginForm';
import './styles/LogRegPage.css';
import firebase from '../firebase.js';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const LoginPage = () => {
    const auth = getAuth();
    const [error, setError] = useState(''); // State for storing the error message
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login successful, redirect to /home
                navigate('/home');
            })
            .catch((error) => {
                // Login failed, set error message
                setError('Login failed: ' + error.message);
            });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                {error && <div className="login-error">{error}</div>}
                <LoginForm className="login-form" onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;