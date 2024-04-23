import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('submits correct email and password on registration', () => {
    const mockOnRegister = jest.fn();

    render(
      <Router>
        <RegistrationForm onRegister={mockOnRegister} />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'userPassword123' } });

    expect(mockOnRegister).toHaveBeenCalledWith('user@example.com', 'userPassword123');
  });
});
