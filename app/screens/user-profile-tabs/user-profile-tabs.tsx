import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { observer } from "mobx-react-lite"
import React from "react"
import { ViewStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"
import { color } from "theme"
import { BookmarksScreen } from "./screens/bookmarks-screen"
import { HistoryScreen } from "./screens/history-screen"

export type UserProfileRouteParamList = {
  Bookmarks: undefined
  History: undefined
}

const Tab = createMaterialTopTabNavigator<UserProfileRouteParamList>()

const tabBarStyle: ViewStyle = {
  backgroundColor: color.background,
}

const tabBarIndicatorStyle: ViewStyle = {
  borderBottomColor: ThemeManager.CTABackgroundColor,
  borderBottomWidth: 4,
}

export const UserProfileTabs = observer(function UserProfileTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle, tabBarIndicatorStyle }}>
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          lazy: true,
        }}
      />
    </Tab.Navigator>
  )
})
