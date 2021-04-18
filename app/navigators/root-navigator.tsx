/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { mainExitRoutes, MainNavigator, MainRouteNames } from "app/navigators/main-navigator"
import { authExitRoutes, AuthNavigator, AuthRouteNames } from "app/navigators/auth-navigator"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
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

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userState) => {
      userStore.updateUser(userState)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!userStore.user ? (
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  )
})

export const RootNavigator = React.forwardRef<
NavigationContainerRef,
Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"

export type AllRouteNames = MainRouteNames | AuthRouteNames
const exitRoutes = [...authExitRoutes, ...mainExitRoutes]
export const canExit = (routeName: AllRouteNames) => exitRoutes.includes(routeName)
