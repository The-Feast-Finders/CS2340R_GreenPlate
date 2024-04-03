import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipeList from './RecipeList'; // Adjust the import path as necessary
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Mock Firestore methods
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn()
}));

it('fetches and displays recipes', async () => {
    // Mock the Firestore data return
    const mockRecipesData = [
      { id: '1', name: 'Recipe 1' },
      { id: '2', name: 'Recipe 2' }
    ];
    getDocs.mockResolvedValue({
      docs: mockRecipesData.map(data => ({
        id: data.id,
        data: () => data
      }))
    });
  
    render(<RecipeList />);
  
    await waitFor(() => {
      mockRecipesData.forEach(recipe => {
        expect(screen.getByText(recipe.name)).toBeInTheDocument();
      });
    });
  });
  