import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientPage from './IngredientPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavigationBar from '../components/NavigationBar';
import InputIngredient from '../components/InputIngredient';
import PantryList from '../components/PantryList';

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
      expect(screen.getByText('Ingredient Page')).toBeInTheDocument();
      expect(screen.getByText('Welcome to the Ingredient Page!')).toBeInTheDocument();
      expect(screen.getByText('NavigationBar')).toBeInTheDocument();
      expect(screen.getByText('PantryList')).toBeInTheDocument();
      expect(screen.getByText('InputIngredient')).toBeInTheDocument();
    });
  });

  it('handles user authentication state', async () => {
    render(<IngredientPage />);

    await waitFor(() => {
    
      expect(screen.getByText('PantryList')).toBeInTheDocument();
      expect(screen.getByText('InputIngredient')).toBeInTheDocument();
    });
  });
});
