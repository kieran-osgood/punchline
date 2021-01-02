import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { color } from 'theme/index';

import Home from 'main/screens/home';
import Settings from 'main/screens/settings';
import UserProfile from 'app/main/screens/user-profile';

export type RouteParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
  UserProfile: undefined;
};

export type NavigationProps<T extends keyof RouteParamList> = {
  route: RouteProp<RouteParamList, T>;
  navigation: MaterialBottomTabNavigationProp<RouteParamList, T>;
};

const Tab = createMaterialBottomTabNavigator<RouteParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      activeColor={color.palette.black}
      inactiveColor={color.palette.lightGrey}
      sceneAnimationEnabled
      labeled={false}
      barStyle={{ backgroundColor: color.background }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color: tabColor = 'red' }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          }
          if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          }
          if (route.name === 'UserProfile') {
            iconName = 'user-alt';
          }

          return <Icon name={iconName} size={22} color={tabColor} />;
        },
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      {/* <Tab.Screen name="Account" component={Account} /> */}
    </Tab.Navigator>
  );
}
