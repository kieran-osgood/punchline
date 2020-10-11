import React from 'react';
import { ViewStyle } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { color, spacing } from 'theme';

import CenterView from 'components/centerview';
import Text from 'components/text';

export type RouteParamList = {
  Bookmarks: undefined;
  History: undefined;
};

const Tab = createMaterialTopTabNavigator<RouteParamList>();
export default function UserProfile() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: TAB_STYLE,
      }}>
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

const TAB_STYLE: ViewStyle = {
  backgroundColor: color.background,
};

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
};

const Bookmarks = () => (
  <CenterView style={CONTAINER}>
    <Text text="test" />
  </CenterView>
);

const History = () => (
  <CenterView style={CONTAINER}>
    <Text text="test" />
  </CenterView>
);
