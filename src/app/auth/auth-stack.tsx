import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RouteParamList } from 'auth/auth-param-list';
import Register from 'auth/screens/register';
import LoginChoices from 'auth/screens/login-choices';
import EmailPassword from 'auth/screens/email-password';

const Stack = createStackNavigator<RouteParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   header: () => null,
      // }}
      initialRouteName="LoginChoices">
      <Stack.Screen
        options={{
          headerTitle: 'Email / Password',
        }}
        name="EmailPassword"
        component={EmailPassword}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Login',
        }}
        name="LoginChoices"
        component={LoginChoices}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Sign Up',
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
