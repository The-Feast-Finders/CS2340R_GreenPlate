import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onRegister, className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(email, password);
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
        <button type="submit">Register</button>
        <p className="register-link">Already a user? <Link to="/">Login Now</Link></p>
      </div>
    </form>
  );
};

export default RegistrationForm;
