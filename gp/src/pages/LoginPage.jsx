import React from 'react';
import LoginForm from '../components/LoginForm';
import './styles/LoginPage.css';

const LoginPage = () => {
    const handleLogin = (username, password) => {
        // Implement your login logic here
        console.log('Login Attempt:', username, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <LoginForm className="login-form" onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;