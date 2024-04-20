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

  test('renders Meal Name input', () => {
    render(<InputMeal user={mockUser} />);
    expect(screen.getByLabelText('Meal Name:')).toBeInTheDocument();
  });

  test('renders Calories input', () => {
    render(<InputMeal user={mockUser} />);
    expect(screen.getByLabelText('Calories:')).toBeInTheDocument();
  });

  test('accepts input in Meal Name', () => {
    render(<InputMeal user={mockUser} />);
    fireEvent.change(screen.getByLabelText('Meal Name:'), { target: { value: 'Breakfast' } });
    expect(screen.getByLabelText('Meal Name:')).toHaveValue('Breakfast');
  });

  test('accepts input in Calories', () => {
    render(<InputMeal user={mockUser} />);
    fireEvent.change(screen.getByLabelText('Calories:'), { target: { value: '500' } });
    expect(screen.getByLabelText('Calories:')).toHaveValue(500);
  });

});
