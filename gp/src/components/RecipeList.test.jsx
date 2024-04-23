import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    // Mock other Firebase services as needed
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({
            exists: true,
            data: () => ({
            }),
          }),
          onSnapshot: jest.fn(),
        }),
      }),
    }),
  }),
  apps: [],
  auth: () => ({
    onAuthStateChanged: jest.fn(),
  }),
}));

// Mock Firestore separately if your component uses Firestore directly
jest.mock('firebase/firestore');

describe('RecipeList', () => {
  it('renders the header correctly', async () => {
    render(<RecipeList />);
    expect(await screen.findByText('Recipe List')).toBeInTheDocument();
  });

});
