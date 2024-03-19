import { render, screen } from '@testing-library/react';
import App from './App';
import InputMeal from './components/InputMeal';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//InputMeal Tests:
test('submits form with valid data', async () => {
  //Creates InputMeal component using mock user data
  const mockUser = { uid: 'mockUserId' };
  const { getByLabelText, getByText } = render(<InputMeal user={mockUser} />);

  //Add a meal into the form
  fireEvent.change(getByLabelText('Meal Name:'), { target: { value: 'Breakfast' } });
  fireEvent.change(getByLabelText('Calories:'), { target: { value: '300' } });
  fireEvent.submit(getByText('Add Meal'));

  //Check the console log for confirmation
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('Meal added successfully');
  });
});

test('does not submit form if user is not logged in', async () => {
  //Creates InputMeal component without user information
  const { getByLabelText, getByText } = render(<InputMeal />);
  console.error = jest.fn();

  //Add a meal into the form
  fireEvent.change(getByLabelText('Meal Name:'), { target: { value: 'Dinner' } });
  fireEvent.change(getByLabelText('Calories:'), { target: { value: '500' } });
  fireEvent.submit(getByText('Add Meal'));

  //Check the console log for confirmation
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('User is not logged in');
  });
});