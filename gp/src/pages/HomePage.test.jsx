import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage', () => {
  test('renders HomePage content', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the main title is rendered
    expect(screen.getByText('Welcome to GreenPlate!')).toBeInTheDocument();

    
  });
});