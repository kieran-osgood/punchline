/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { WelcomeScreen, DemoScreen, DemoListScreen, LoginScreen } from "../screens"
import { RouteProp } from '@react-navigation/native'
import { color } from 'theme'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RouteParamList = {
  LoginChoices: undefined;
  Login: undefined;
  EmailPassword: undefined;
  Register: undefined;
};

export type AuthNavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: StackNavigationProp<RouteParamList, T>;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<RouteParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   header: () => null,
    // }}
    initialRouteName="LoginChoices">
    {/* <Stack.Screen
      options={{
        headerTitle: 'Email / Password',
        headerStyle: {
          backgroundColor: color.background,
        },
      }}
      name="EmailPassword"
      component={EmailPassword}
    /> */}
    <Stack.Screen
      options={{
        headerTitle: 'Login',
        header: () => null,
      }}
      name="LoginChoices"
      component={LoginScreen}
    />
    {/* <Stack.Screen
      options={{
        headerTitle: 'Sign Up',
      }}
      name="Register"
      component={Register}
    /> */}
  </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
type RouteNames = keyof RouteParamList;
const exitRoutes: [RouteNames] = ['LoginChoices']
export const canExit = (routeName: RouteNames) => exitRoutes.includes(routeName)
