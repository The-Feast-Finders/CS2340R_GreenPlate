import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShoppingList from './ShoppingList'; // Adjust the path as necessary
import { getFirestore } from 'firebase/firestore';


// Mocking Firestore and its methods
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(() => Promise.resolve()),
    deleteDoc: jest.fn(() => Promise.resolve()),
    addDoc: jest.fn(() => Promise.resolve()),
    query: jest.fn(),
    where: jest.fn()
}));

const mockUser = { uid: '123456' };
const mockItems = [
    { id: '1', ingredient: 'Tomatoes', quantity: 5 },
    { id: '2', ingredient: 'Potatoes', quantity: 10 }
];

beforeEach(() => {
    jest.clearAllMocks();
    require('firebase/firestore').getDocs.mockResolvedValue({
        docs: mockItems.map(item => ({
            id: item.id,
            data: () => item
        }))
    });
});

describe('ShoppingList Component', () => {
    test('fetches and displays shopping items', async () => {
        render(<ShoppingList user={mockUser} />);
        
        // Wait for items to be fetched and displayed
        expect(await screen.findByText('Tomatoes - Quantity: 5')).toBeInTheDocument();
        expect(screen.getByText('Potatoes - Quantity: 10')).toBeInTheDocument();
    });

    test('updates quantity of an item', async () => {
        render(<ShoppingList user={mockUser} />);
        
        // Simulate clicking the '+' button for Tomatoes
        const increaseButton = (await screen.findAllByText('+'))[0];
        fireEvent.click(increaseButton);
        
        // Check if updateDoc was called with increased quantity
        expect(require('firebase/firestore').updateDoc).toHaveBeenCalledWith(
            expect.anything(),
            { quantity: 6 }
        );
    });

    test('handles item selection and buys selected items', async () => {
        render(<ShoppingList user={mockUser} />);
        
        // Select the first item
        const checkbox = (await screen.findAllByRole('checkbox'))[0];
        fireEvent.click(checkbox);
        
        // Buy selected items
        fireEvent.click(screen.getByText('Buy Selected Items'));
        
        // Check if deleteDoc was called for the bought item
        expect(require('firebase/firestore').deleteDoc).toHaveBeenCalled();
    });
});
