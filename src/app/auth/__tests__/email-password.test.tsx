import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import EmailPassword from '../screens/email-password';

test('should render the EmailPassword page', async () => {
  render(<EmailPassword />);
});

test('should show an error for the email', async () => {
  const { getByPlaceholderText, queryByText } = render(<EmailPassword />);

  const emailInput = getByPlaceholderText(/email@example.com/i);
  const errorText = /Enter a valid email/i;
  let errorMessage = queryByText(errorText);

  expect(errorMessage).toBeFalsy(); // Hidden on pageload

  fireEvent(emailInput, 'focus'); // onFocus the error message should appear
  errorMessage = queryByText(errorText);
  expect(errorMessage).toHaveTextContent(errorText);

  fireEvent.changeText(emailInput, 'test@gmail'); // invalidEmail
  expect(errorMessage).toHaveTextContent(errorText);

  fireEvent.changeText(emailInput, 'testgmail.com'); // invalidEmail
  expect(errorMessage).toHaveTextContent(errorText);

  fireEvent.changeText(emailInput, 'test@gmail.com');
  expect(errorMessage).not.toHaveTextContent(errorText);
});

test('should show disabled button', async () => {
  const { getByRole } = render(<EmailPassword />);
  const loginButton = getByRole('button');
  // Button is disabled on page load - this test will fail if disabled style changes
  expect(loginButton).toBeDisabled(); // Does this work????
});

test('should disable button when insufficient input', async () => {
  const { getByPlaceholderText, getByRole } = render(<EmailPassword />);

  const emailInput = getByPlaceholderText(/email@example.com/i);
  const passwordInput = getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
  const loginButton = getByRole('button');

  fireEvent.changeText(emailInput, 'test@gmail.com');
  fireEvent.changeText(passwordInput, '12345');
  expect(loginButton).toBeDisabled(); // short password so disabled

  fireEvent.changeText(passwordInput, '123456');
  expect(loginButton).toBeEnabled();
});
