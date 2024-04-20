import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('submits correct email and password on login', () => {
    const mockOnLogin = jest.fn();
    render(
      <Router>
        <LoginForm onLogin={mockOnLogin} />
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
