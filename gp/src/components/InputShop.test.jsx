import React from 'react';
import { render, screen } from '@testing-library/react';
import InputShop from './InputShop'; // Adjust the import path as necessary
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

describe('InputShop', () => {
  beforeEach(() => {
    // Setup the Firebase mocks to return a dummy object
    initializeApp.mockReturnValue({});
    getFirestore.mockReturnValue({});
  });

  test('renders Ingredient Name input', () => {
    const user = { uid: '123' };
    render(<InputShop user={user} />);
    expect(screen.getByLabelText(/Ingredient Name/i)).toBeInTheDocument();
  });

  test('renders Quantity input', () => {
    const user = { uid: '123' };
    render(<InputShop user={user} />);
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
  });

  test('renders Add Ingredient button', () => {
    const user = { uid: '123' };
    render(<InputShop user={user} />);
    expect(screen.getByRole('button', { name: /Add Ingredient/i })).toBeInTheDocument();
  });

});
