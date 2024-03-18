import React from 'react';
import LoginForm from '../components/LoginForm';
import './styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    const handleLogin = (username, password) => {
        // Implement your login logic here
        console.log('Login Attempt:', username, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <LoginForm className="login-form" onLogin={handleLogin} />
                <button onClick={() => navigate('/home')}>Go Home</button>
            </div>
        </div>
    );
};

export default LoginPage;