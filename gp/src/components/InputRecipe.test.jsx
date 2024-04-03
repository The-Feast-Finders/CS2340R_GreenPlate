import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputRecipe from './InputRecipe';

//Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  collection: jest.fn(),
  Timestamp: { fromDate: jest.fn() },
}));

describe('InputRecipe Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial state', () => {
    render(<InputRecipe />);
    expect(screen.getByText('Add Recipe')).toBeInTheDocument();
    expect(screen.getByLabelText('Recipe Name:')).toHaveValue('');
    expect(screen.queryByText('Ingredient Name')).not.toBeInTheDocument();
  });

  test('removes ingredient fields', () => {
    render(<InputRecipe />);
    fireEvent.click(screen.getByText('Add Ingredient'));
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByText('Ingredient Name')).not.toBeInTheDocument();
  });

  test('updates recipe name on input', () => {
    render(<InputRecipe />);
    fireEvent.change(screen.getByLabelText('Recipe Name:'), { target: { value: 'New Recipe' } });
    expect(screen.getByLabelText('Recipe Name:')).toHaveValue('New Recipe');
  });

  test('form submission with invalid data does not call Firestore', () => {
    render(<InputRecipe />);
    fireEvent.click(screen.getByText('Save Recipe'));

    expect(require('firebase/firestore').setDoc).not.toHaveBeenCalled();
  });

});