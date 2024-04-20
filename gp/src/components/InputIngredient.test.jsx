import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InputIngredient from './InputIngredient';

// Mock firebase
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn().mockResolvedValue({
      forEach: jest.fn(),
      empty: true
    })
  })),
  Timestamp: {
    fromDate: jest.fn(date => ({ toDate: () => new Date(date) }))
  }
}));

describe('InputIngredient', () => {
  const mockUser = { uid: '12345' };

  it('renders without showing the form initially', () => {
    render(<InputIngredient user={mockUser} />);
    // Check that the form is not visible initially
    expect(screen.queryByLabelText('Ingredient Name:')).not.toBeInTheDocument();
  });

  it('displays the form when the add button is clicked', () => {
    render(<InputIngredient user={mockUser} />);

    // Click the "Add Ingredient" button to show the form
    fireEvent.click(screen.getByRole('button', { name: 'Add Ingredient' }));

    // Check if the form is now visible
    expect(screen.getByLabelText('Ingredient Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Calories:')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date (optional):')).toBeInTheDocument();
  });

  it('has functional form controls after form is visible', () => {
    render(<InputIngredient user={mockUser} />);

    // Open the form
    fireEvent.click(screen.getByRole('button', { name: 'Add Ingredient' }));

    // Verify all form elements are in place
    expect(screen.getByRole('button', { name: 'Add Ingredient' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
