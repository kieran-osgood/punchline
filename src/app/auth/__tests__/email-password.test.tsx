import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import EmailPassword from '../screens/email-password';
import { fireAsyncChangeText } from 'src/test';

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

  await fireAsyncChangeText(emailInput, badEmail1); // empty string
  getByText(errorMessage1);

  await fireAsyncChangeText(emailInput, badEmail2); //invalid
  getByText(errorMessage2);

  await fireAsyncChangeText(emailInput, 'test@gmail.com');
  expect(queryByText(errorMessage2)).toBeFalsy();
}, 30000);

test('should show disabled button', () => {
  const { getByText } = render(<EmailPassword />);
  const loginButton = getByText(/login/i);
  // Button is disabled on page load - this test will fail if disabled style changes
  expect(loginButton).toBeDisabled();
});

test('should disable button when password length is short', async () => {
  const { getByPlaceholderText, getByText } = render(<EmailPassword />);
  const emailInput = getByPlaceholderText(/email@example.com/i);
  const passwordInput = getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
  const loginButton = getByText(/Login/i);

  await act(async () => {
    fireEvent.changeText(emailInput, 'test@gmail.com'); // valid email
  });
  expect(loginButton).toBeDisabled(); // short password so disabled

  await act(async () => {
    fireEvent.changeText(passwordInput, '12345');
  });
  expect(loginButton).toBeDisabled(); // short password so disabled

  await act(async () => {
    fireEvent.changeText(passwordInput, '123456');
  });
  expect(loginButton).toBeEnabled();
});
