import React from 'react';
import { render, screen } from '@testing-library/react';
import ShoppingListPage from '../ShoppingListPage';

// Mock the NavigationBar component since it's not the focus of this test
jest.mock('../components/NavigationBar', () => () => <div>NavigationBarMock</div>);

describe('ShoppingListPage', () => {
  test('renders welcome message for the shopping list page', () => {
    render(<ShoppingListPage />);

    // Check if the welcome message is in the document
    expect(screen.getByText('Welcome to the Shopping List')).toBeInTheDocument();
  });
});
