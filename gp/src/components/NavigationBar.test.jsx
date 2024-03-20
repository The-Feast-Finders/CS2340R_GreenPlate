import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  test('renders all navigation links', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    // Check for each link using getByRole
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    expect(screen.getByRole('link', { name: 'Input Meal' })).toHaveAttribute('href', '/input-meal');
    expect(screen.getByRole('link', { name: 'Recipe' })).toHaveAttribute('href', '/recipe');
    expect(screen.getByRole('link', { name: 'Ingredient' })).toHaveAttribute('href', '/ingredient');
    expect(screen.getByRole('link', { name: 'Shopping List' })).toHaveAttribute('href', '/shopping-list');
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile');
  });
});
