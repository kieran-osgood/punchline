import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import EmailPassword from '../screens/email-password';

test('should render the EmailPassword page', async () => {
  render(<EmailPassword />);
});

test('should show an error for the email', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <EmailPassword />,
  );

  const emailInput = getByPlaceholderText(/email@example.com/i);
  const errorMessage1 = /Email is required./i;
  const errorMessage2 = /Please enter a valid Email address./i;
  const badEmail1 = '';
  const badEmail2 = 'testgmail.com';

  expect(queryByText(errorMessage1)).toBeFalsy(); // Hidden on pageload

  fireEvent.changeText(emailInput, badEmail1); // empty string
  await waitFor(() => getByText(errorMessage1));

  fireEvent.changeText(emailInput, badEmail2); //invalid
  await waitFor(() => getByText(errorMessage2));

  fireEvent.changeText(emailInput, 'test@gmail.com');
  await waitForElementToBeRemoved(() => getByText(errorMessage2));
}, 30000);

test('should show disabled button', async () => {
  const { getByText } = render(<EmailPassword />);
  const loginButton = getByText(/login/i);
  // Button is disabled on page load - this test will fail if disabled style changes
  expect(loginButton).toBeDisabled(); // Does this work????
});

test('should disable button when password length is short', async () => {
  const { getByPlaceholderText, getByText } = render(<EmailPassword />);

  const emailInput = getByPlaceholderText(/email@example.com/i);
  const passwordInput = getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
  const loginButton = getByText(/Login/i);

  fireEvent.changeText(emailInput, 'test@gmail.com'); // valid email
  expect(loginButton).toBeDisabled(); // short password so disabled
  fireEvent.changeText(passwordInput, '12345');
  expect(loginButton).toBeDisabled(); // short password so disabled

  fireEvent.changeText(passwordInput, '123456');
  expect(loginButton).toBeEnabled();
});
