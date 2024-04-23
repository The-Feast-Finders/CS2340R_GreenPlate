import { render, screen } from '@testing-library/react';
import UserInfo from './UserInfo';

test('UserInfo renders initial loading state correctly', () => {
  render(<UserInfo />);

  expect(screen.getByText('User Information:')).toBeInTheDocument();

 
  const loadingElements = screen.getAllByText(/Loading.../);
  expect(loadingElements.length).toBeGreaterThan(0); 

});
