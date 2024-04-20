import React from 'react';
import { render, screen } from '@testing-library/react';
import InputShop from './InputShop'; // Adjust the import path as necessary
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Mock the Firebase modules used in the component
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

describe('InputShop', () => {
  it('renders without crashing', () => {
    // Setup the Firebase mocks to return a dummy object
    initializeApp.mockReturnValue({});
    getFirestore.mockReturnValue({});

    // Provide the minimal props expected by the component
    const user = { uid: '123' }; // Mock user object
    
    render(<InputShop user={user} />);
    
    // Check for a basic element to confirm the component has rendered
    expect(screen.getByLabelText(/Ingredient Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Ingredient/i })).toBeInTheDocument();
  });
});
