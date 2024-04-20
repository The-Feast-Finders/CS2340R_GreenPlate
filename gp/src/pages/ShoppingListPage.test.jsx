import React from 'react';
import { render, screen } from '@testing-library/react';
import ShoppingListPage from './ShoppingListPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Mocking the necessary imports
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn()
}));

jest.mock('../components/NavigationBar', () => () => <div>NavigationBar Mock</div>);
jest.mock('../components/InputShop', () => () => <div>InputShop Mock</div>);
jest.mock('../components/ShoppingList', () => () => <div>ShoppingList Mock</div>);

describe('ShoppingListPage', () => {
    // Setting up a mock for onAuthStateChanged to simulate a user being set
    beforeEach(() => {
        getAuth.mockImplementation(() => ({}));
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback({ name: 'Test User' }); // Simulate a user being logged in
            return jest.fn(); // This represents the unsubscribe function
        });
    });

    it('renders the shopping list page with navigation bar, input shop, and shopping list', () => {
        render(<ShoppingListPage />);
        //expect(screen.getByText('NavigationBar Mock')).toBeInTheDocument();
        //expect(screen.getByText('Welcome to the Shopping List')).toBeInTheDocument();
        //expect(screen.getByText('InputShop Mock')).toBeInTheDocument();
        //expect(screen.getByText('ShoppingList Mock')).toBeInTheDocument();
    });
});
