import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native';

import { AuthNavigationProps, RouteParamList } from './authparamlist';
import CenterView from '../../components/centerview';

const Stack = createStackNavigator<RouteParamList>();

function Login({ navigation }: AuthNavigationProps<'Login'>) {
  return (
    <CenterView>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          console.log('test');
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </CenterView>
  );
}

function Register({ navigation, route }: AuthNavigationProps<'Register'>) {
  return (
    <CenterView>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate('Login');
          // navigation.goBack()
        }}
      />
    </CenterView>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login">
      <Stack.Screen
        options={{
          headerTitle: 'Sign In',
        }}
        name="Login"
        component={Login}
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
