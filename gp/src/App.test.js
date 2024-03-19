import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';
import InputMeal from './components/InputMeal';
import LoginPage from './LoginPage';
import { signInWithEmailAndPassword } from 'firebase/auth';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//
//InputMeal Tests:
//
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

//
//LoginForm Tests:
//
// Mocking signInWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

it('should handle login failure correctly', async () => {
    const email = 'null@null';
    const password = 'password';
    const navigateMock = jest.fn(); // Mocking the navigate function
    const setErrorMock = jest.fn(); // Mocking the setError function
    const errorMessage = 'Invalid email or password';

    // Render LoginPage component
    const { getByLabelText, getByText } = render(
      <LoginPage navigate={navigateMock} setError={setErrorMock} />
    );

    // Fill in email and password fields
    fireEvent.change(getByLabelText('null@null'), { target: { value: email } }); // Simulating user entering email
    fireEvent.change(getByLabelText('password'), {
      target: { value: password },
    }); // Simulating user entering password

    // Mock failed sign in
    signInWithEmailAndPassword.mockRejectedValueOnce({
      message: errorMessage,
    }); // Mocking a failed sign in

    // Trigger login button click
    fireEvent.click(getByText('Login')); // Simulating user clicking the login button

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object), // auth object
        email,
        password
      ); // Expecting signInWithEmailAndPassword to be called with the provided email and password
      expect(navigateMock).not.toHaveBeenCalled(); // Expecting navigation not to occur
      expect(setErrorMock).toHaveBeenCalledWith(`Login failed: ${errorMessage}`); // Expecting setError to be called with appropriate error message
    });
});

it('displays error message for invalid account login', async () => {
  // signInWithEmailAndPassword to simulate login failure
  const errorMessage = 'Invalid email or password';
  signInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

  const { getByLabelText, getByText } = render(<LoginPage />);

  // entering email and password
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

  // Clicking login button
  fireEvent.click(getByText('Login'));

  // Assert that the error message is displayed
  await waitFor(() => {
    expect(getByText('Login failed: ' + errorMessage)).toBeInTheDocument();
  });

  // Ensure signInWithEmailAndPassword is called with correct parameters
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'invalid@example.com', 'invalidpassword');
});

//
//RegistrationPage Tests
//
it('should handle registration failure correctly', async () => {
  const email = 'clairesmiley13@gmail.com';
  const password = 'pass';
  const navigateMock = jest.fn(); // Mocking the navigate function
  const setErrorMock = jest.fn(); // Mocking the setError function
  const errorMessage = 'Email already exists';

  // Render RegistrationPage component
  const { getByLabelText, getByText } = render(
    <RegistrationPage navigate={navigateMock} setError={setErrorMock} />
  );

  // Fill in email and password fields
  fireEvent.change(getByLabelText('clairesmiley13@gmail.com'), { target: { value: email } }); // Simulating user entering email
  fireEvent.change(getByLabelText('pass'), {
    target: { value: password },
  }); // Simulating user entering password

  // Mock failed registration
  createUserWithEmailAndPassword.mockRejectedValueOnce({
    message: errorMessage,
  }); // Mocking a failed registration

  // Trigger register button click
  fireEvent.click(getByText('Register')); // Simulating user clicking the register button

  // Wait for asynchronous operations to complete
  await waitFor(() => {
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object), // auth object
      email,
      password
    ); // Expecting createUserWithEmailAndPassword to be called with the provided email and password
    expect(localStorage.setItem).not.toHaveBeenCalled(); // Expecting localStorage not to be called
    expect(navigateMock).not.toHaveBeenCalled(); // Expecting navigation not to occur
    expect(setErrorMock).toHaveBeenCalledWith(
      `Registration failed: ${errorMessage}`
    ); // Expecting setError to be called with appropriate error message
  });
});