import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UpdateInfo = ({ onLogin, className }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(password);
  };
}