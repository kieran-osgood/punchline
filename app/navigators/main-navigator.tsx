/* eslint-disable react/display-name */
/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { RouteProp } from "@react-navigation/native"
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import withRateApp from "app/components/with-rate-app/with-rate-app"
import { useStores } from "app/models"
import { Header } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { JokeScreen, MainSettingsScreen, OnboardingScreen, UserProfileTabs } from "../screens"

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
export type MainRouteParamList = {
  JokeScreen:
    | {
        id: string
      }
    | undefined
  LoginScreen: undefined
  UserProfileTabs: undefined
  OnboardingScreen: undefined
  MainSettingsScreen: undefined
}

export type NavigationProps<T extends keyof MainRouteParamList> = {
  route: RouteProp<MainRouteParamList, T>
  navigation: StackNavigationProp<MainRouteParamList, T>
}

const Stack = createStackNavigator<MainRouteParamList>()

export const MainNavigator = observer(function MainNavigator() {
  const store = useStores()

  return (
    <Stack.Navigator
      initialRouteName="JokeScreen"
      screenOptions={{
        headerMode: "screen",
      }}
    >
      {!store.userStore.onboardingComplete ? (
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            header: () => null,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="JokeScreen"
            component={withRateApp(JokeScreen)}
            options={{
              header: (props) => <Header {...props} left="account" right="settings" />,
            }}
          />
          <Stack.Screen
            name="UserProfileTabs"
            component={UserProfileTabs}
            options={{
              header: (props) => <Header {...props} right="back" />,
              gestureDirection: "horizontal-inverted",
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="MainSettingsScreen"
            component={MainSettingsScreen}
            options={{
              header: (props) => <Header {...props} left="back" />,
              gestureDirection: "horizontal",
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </>
      )}
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
export type MainRouteNames = keyof MainRouteParamList
export const mainExitRoutes: MainRouteNames[] = ["OnboardingScreen", "JokeScreen"]
