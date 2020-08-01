import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import Home from '../home';
import Settings from '../settings';
import Login from '../login';

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

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      {/* <Tab.Screen name="Account" component={Account} /> */}
    </Tab.Navigator>
  );
}
