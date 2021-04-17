/* eslint-disable react/display-name */
/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RouteProp } from '@react-navigation/native'
import { color } from 'theme'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'
import { JokeScreen, SettingsScreen, UserProfileScreen } from '../screens'
// import Icon from 'react-native-vector-icons/FontAwesome5'

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
  JokeScreen: undefined;
  SettingsScreen: undefined;
  LoginScreen: undefined;
  UserProfileScreen: undefined;
};

export type NavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: MaterialBottomTabNavigationProp<RouteParamList, T>;
};

const Tab = AnimatedTabBarNavigator<RouteParamList>()

export function MainNavigator() {
  return (
    <Tab.Navigator
    activeColor={color.palette.black}
    inactiveColor={color.palette.lightGrey}
    sceneAnimationEnabled
    labeled={false}
    barStyle={{ backgroundColor: color.background }}
    screenOptions={({ route }: { route: { name: string } }) => ({
      tabBarIcon: ({
        focused,
        color: tabColor = 'red',
      }: {
        focused: boolean;
        color: string;
      }) => {
        // let iconName = ''

        // if (route.name === 'Home') {
        //   iconName = focused ? 'home' : 'home'
        // }
        // if (route.name === 'Settings') {
        //   iconName = focused ? 'cog' : 'cog'
        // }
        // if (route.name === 'UserProfile') {
        //   iconName = 'user-alt'
        // }

        // return <Icon name={iconName} size={22} color={tabColor} />
        return null
      },
    })}
    initialRouteName="Home">
    <Tab.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />
    <Tab.Screen name="JokeScreen" component={JokeScreen} />
    <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
  </Tab.Navigator>
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
export type MainRouteNames = keyof RouteParamList;
export const mainExitRoutes: [MainRouteNames] = ['JokeScreen']
