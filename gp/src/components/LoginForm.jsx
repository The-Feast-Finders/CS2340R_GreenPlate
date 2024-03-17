import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-footer">
        <button type="submit">Login</button>
        <p className="register-link">Not a user yet? <Link to="/register">Register Now</Link></p>
      </div>
    </form>
  );
};

export default LoginForm;
