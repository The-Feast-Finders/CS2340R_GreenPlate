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

  it('toggles the form display when the add button is clicked', () => {
    render(<InputIngredient user={mockUser} />);

    // Initially, the form should not be displayed
    expect(screen.queryByLabelText('Ingredient Name:')).not.toBeInTheDocument();

    // Click the "Add Ingredient" button to show the form
    fireEvent.click(screen.getByRole('button', { name: 'Add Ingredient' }));

    // Now the form should be visible
    expect(screen.getByLabelText('Ingredient Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Calories:')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date (optional):')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Ingredient' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
