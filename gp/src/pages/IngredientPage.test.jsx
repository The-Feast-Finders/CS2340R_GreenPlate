import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IngredientPage from './IngredientPage';

describe('IngredientPage', () => {
  test('renders Ingredient Page text', () => {
    render(
      <Router>
        <IngredientPage />
      </Router>
    );

    // Check if the page title is rendered
    expect(screen.getByText('Ingredient Page')).toBeInTheDocument();

    // Check if the welcome message is rendered
    expect(screen.getByText('Welcome to the Ingredient Page!')).toBeInTheDocument();
  });
});
