import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { observer } from "mobx-react-lite"
import React from "react"
import { ViewStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/AntDesign"
import { color } from "theme"
import { BookmarksScreen } from "../bookmarks/bookmarks-screen"
import { HistoryScreen } from "../history/history-screen"

export type UserProfileRouteParamList = {
  Bookmarks: undefined
  History: undefined
}

const Tab = createMaterialTopTabNavigator<UserProfileRouteParamList>()

const TAB_BAR: ViewStyle = {
  backgroundColor: color.background,
}

const INDICATOR: ViewStyle = {
  borderBottomColor: ThemeManager.CTABackgroundColor,
  borderBottomWidth: 4,
}

const size = 25

export const UserProfileTabs = observer(function UserProfileTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: TAB_BAR,
        showIcon: true,
        indicatorStyle: INDICATOR,
      }}
    >
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: function TabIcon({ color }) {
            return <Icon name="staro" {...{ color, size }} />
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: function TabIcon({ color }) {
            return <Icon name="book" {...{ color, size }} />
          },
        }}
      />
    </Tab.Navigator>
  )
})
