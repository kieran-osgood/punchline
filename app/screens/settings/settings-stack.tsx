/* eslint-disable react/display-name */
/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { RouteProp } from "@react-navigation/native"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { BugReportScreen } from "app/screens"
import JokePreferencesScreen from "app/screens/settings/screens/joke-preferences"
import { MainSettingsScreen } from "app/screens/settings/screens/main-settings"
import { Header } from "components"
import { observer } from "mobx-react-lite"
import React from "react"

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
export type SettingsRouteParamList = {
  Main: undefined
  JokePreferences: undefined
  BugReport: undefined
}

export type SettingsStackProps<T extends keyof SettingsRouteParamList> = {
  route: RouteProp<SettingsRouteParamList, T>
  navigation: StackNavigationProp<SettingsRouteParamList, T>
}

const Stack = createStackNavigator<SettingsRouteParamList>()

export const SettingsStack = observer(function SettingsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        header: (props) => <Header {...props} left="back" />,
        headerMode: "screen",
      }}
    >
      <Stack.Screen name="Main" component={MainSettingsScreen} />
      <Stack.Screen
        name="JokePreferences"
        component={JokePreferencesScreen}
        options={{
          headerTitle: "Content Preferences",
        }}
      />
      <Stack.Screen
        name="BugReport"
        component={BugReportScreen}
        options={{
          headerTitle: "Bug Report",
        }}
      />
    </Stack.Navigator>
  )
})

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
export type MainRouteNames = keyof SettingsRouteParamList
export const mainExitRoutes: MainRouteNames[] = []
