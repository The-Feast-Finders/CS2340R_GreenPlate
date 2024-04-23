import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientPage from './IngredientPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Mock the necessary modules
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

jest.mock('../components/NavigationBar', () => () => <div>NavigationBar</div>);
jest.mock('../components/InputIngredient', () => () => <div>InputIngredient</div>);
jest.mock('../components/PantryList', () => () => <div>PantryList</div>);

describe('IngredientPage', () => {
  const mockUser = { uid: '123', email: 'test@example.com' };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock for onAuthStateChanged
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser); // Simulate user is logged in
      return jest.fn(); // Return a mock unsubscribe function
    });
  });

  it('renders correctly', async () => {
    render(<IngredientPage />);

    await waitFor(() => {
      expect(screen.getByText('NavigationBar')).toBeInTheDocument();
      
    });
  });

});
