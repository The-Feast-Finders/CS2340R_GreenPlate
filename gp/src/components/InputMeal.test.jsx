import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputMeal from './InputMeal';

const mockUser = {
  uid: 'user123',
};

describe('InputMeal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<InputMeal user={mockUser} />);
    expect(screen.getByLabelText('Meal Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Calories:')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<InputMeal user={mockUser} />);
    fireEvent.change(screen.getByLabelText('Meal Name:'), { target: { value: 'Breakfast' } });
    fireEvent.change(screen.getByLabelText('Calories:'), { target: { value: '500' } });
    expect(screen.getByLabelText('Meal Name:')).toHaveValue('Breakfast');
    expect(screen.getByLabelText('Calories:')).toHaveValue(500);
  });

});
