import { render, screen } from '@testing-library/react';
import UserInfo from './UserInfo'; // Adjust the import path as necessary

test('UserInfo renders initial loading state correctly', () => {
  render(<UserInfo />);

  // Check for static content
  expect(screen.getByText('User Information:')).toBeInTheDocument();

 
  const loadingElements = screen.getAllByText(/Loading.../);
  expect(loadingElements.length).toBeGreaterThan(0); 

});
