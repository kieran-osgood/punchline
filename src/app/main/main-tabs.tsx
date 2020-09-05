import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { color } from 'theme/index';

import Home from 'main/screens/home';
import Settings from 'main/screens/settings';

export type RouteParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
};

export type NavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: BottomTabNavigationProp<RouteParamList, T>;
};

const Tab = createBottomTabNavigator<RouteParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color = 'red', size = 12 }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          }
          if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: color.palette.black,
        inactiveTintColor: color.palette.lightGrey,
        style: { fontFamily: 'Montserrat', backgroundColor: color.background },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      {/* <Tab.Screen name="Account" component={Account} /> */}
    </Tab.Navigator>
  );
}
