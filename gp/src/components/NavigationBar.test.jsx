import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  // Render the component before each test
  beforeEach(() => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
  });

  test('renders Home link correctly', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  test('renders Input Meal link correctly', () => {
    const inputMealLink = screen.getByRole('link', { name: 'Input Meal' });
    expect(inputMealLink).toBeInTheDocument();
    expect(inputMealLink).toHaveAttribute('href', '/input-meal');
  });

  test('renders Recipe link correctly', () => {
    const recipeLink = screen.getByRole('link', { name: 'Recipe' });
    expect(recipeLink).toBeInTheDocument();
    expect(recipeLink).toHaveAttribute('href', '/recipe');
  });

  test('renders Ingredient link correctly', () => {
    const ingredientLink = screen.getByRole('link', { name: 'Ingredient' });
    expect(ingredientLink).toBeInTheDocument();
    expect(ingredientLink).toHaveAttribute('href', '/ingredient');
  });

  test('renders Shopping List link correctly', () => {
    const shoppingListLink = screen.getByRole('link', { name: 'Shopping List' });
    expect(shoppingListLink).toBeInTheDocument();
    expect(shoppingListLink).toHaveAttribute('href', '/shopping-list');
  });

  test('renders Profile link correctly', () => {
    const profileLink = screen.getByRole('link', { name: 'Profile' });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/profile');
  });
});
