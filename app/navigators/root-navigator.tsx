/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useStores } from "app/models"
import { authExitRoutes, AuthNavigator, AuthRouteNames } from "app/navigators/auth-navigator"
import { mainExitRoutes, MainNavigator, MainRouteNames } from "app/navigators/main-navigator"
import { observer } from "mobx-react-lite"
import React from "react"
import Toast from "react-native-toast-message"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  AuthNavigator: undefined
  MainNavigator: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = observer(function RootStack() {
  const { userStore } = useStores()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!userStore.user?.uid ? (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      )}
    </Stack.Navigator>
  )
})

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} {...{ ref, linking }}>
      <RootStack />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"

export type AllRouteNames = MainRouteNames | AuthRouteNames
const exitRoutes = [...authExitRoutes, ...mainExitRoutes]
export const canExit = (routeName: AllRouteNames) => exitRoutes.includes(routeName)

const linking: LinkingOptions = {
  prefixes: ["https://punch-line.co.uk", "punchline://"],
  config: {
    screens: {
      MainNavigator: {
        initialRouteName: "JokeScreen",
        screens: {
          JokeScreen: {
            path: "jokes/:jokeId",
            parse: { jokeId: String },
          },
        },
      },
    },
  },
}
