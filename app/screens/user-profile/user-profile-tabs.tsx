import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { observer } from "mobx-react-lite"
import React from "react"
import { ViewStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"
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

export const UserProfileTabs = observer(function UserProfileTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: TAB_BAR,
        indicatorStyle: INDICATOR,
      }}
    >
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  )
})
