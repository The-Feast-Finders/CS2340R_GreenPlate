import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipePage from './RecipePage';

// Mock any components that are not the focus of the test
jest.mock('../components/NavigationBar', () => () => <div>NavigationBarMock</div>);
jest.mock('../components/PieGraph', () => () => <div>PieGraphMock</div>);

describe('RecipePage', () => {
  test('renders welcome message for the recipe page', () => {
    render(<RecipePage />);

    // Check if the welcome message is in the document
    expect(screen.getByText('Welcome to the Recipe Page!')).toBeInTheDocument();
  });
});
