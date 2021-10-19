/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { RouteProp } from "@react-navigation/native"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { LoginScreen } from "../screens"

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
export type AuthRouteParamList = {
  Login:
    | {
        token: string
      }
    | undefined
}

export type AuthNavigationProps<T extends keyof AuthRouteParamList> = {
  route: RouteProp<AuthRouteParamList, T>
  navigation: StackNavigationProp<AuthRouteParamList, T>
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthRouteParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{ header: () => null }} name="Login" component={LoginScreen} />
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
export type AuthRouteNames = keyof AuthRouteParamList
export const authExitRoutes: [AuthRouteNames] = ["Login"]
