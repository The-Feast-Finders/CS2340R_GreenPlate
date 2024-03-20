import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from './ProfilePage';

// Mock the necessary Firebase functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()) // Mocks the unsubscribe function
}));

describe('ProfilePage', () => {
  test('renders welcome message', () => {
    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    // Check if the welcome message is in the document
    expect(screen.getByText('Welcome to your Profile!')).toBeInTheDocument();
  });
});

