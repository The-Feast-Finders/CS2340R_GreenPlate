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

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'userPassword123' }
    });

    // Submit the form

    expect(mockOnRegister).toHaveBeenCalledWith('user@example.com', 'userPassword123');
  });
});
