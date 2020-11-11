import React from 'react';
import { ViewStyle } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { color } from 'theme';
import Icon from 'react-native-vector-icons/AntDesign';
import BookmarksScreen from 'app/main/screens/user-profile/bookmarks-screen';
import HistoryScreen from 'app/main/screens/user-profile/history-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RouteParamList = {
  Bookmarks: undefined;
  History: undefined;
};

const Tab = createMaterialTopTabNavigator<RouteParamList>();
export default function UserProfile() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { ...TAB_STYLE, paddingTop: insets.top },
        showIcon: true,
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 4,
        },
      }}>
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color: tabBarColor = '#fff' }) => (
            <Icon name="staro" size={25} color={tabBarColor} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color: tabBarColor = '#fff' }) => (
            <Icon name="book" size={25} color={tabBarColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TAB_STYLE: ViewStyle = {
  backgroundColor: color.background,
};
