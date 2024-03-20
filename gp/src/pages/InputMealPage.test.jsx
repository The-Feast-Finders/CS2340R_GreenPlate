import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import InputMealPage from './InputMealPage';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()) // returns a mock unsubscribe function
}));
  
jest.mock('../components/NavigationBar', () => () => <div>NavigationBarMock</div>);
jest.mock('../components/UserInfo', () => () => <div>UserInfoMock</div>);
jest.mock('../components/InputMeal', () => () => <div>InputMealMock</div>);
jest.mock('../components/PieGraph', () => () => <div>PieGraphMock</div>);
jest.mock('../components/BarGraph', () => () => <div>BarGraphMock</div>);

describe('InputMealPage', () => {
  test('renders static elements', () => {
    render(
      <Router>
        <InputMealPage />
      </Router>
    );

    expect(screen.getByText('Input Your Meals Here!')).toBeInTheDocument();
    expect(screen.getByText('NavigationBarMock')).toBeInTheDocument();
    expect(screen.getByText('UserInfoMock')).toBeInTheDocument();
    expect(screen.getByText('InputMealMock')).toBeInTheDocument();
  });
  
});
