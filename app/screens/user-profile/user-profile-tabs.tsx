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

const style: ViewStyle = {
  backgroundColor: color.background,
}

const indicatorStyle: ViewStyle = {
  borderBottomColor: ThemeManager.CTABackgroundColor,
  borderBottomWidth: 4,
}

export const UserProfileTabs = observer(function UserProfileTabs() {
  return (
    <Tab.Navigator tabBarOptions={{ style, indicatorStyle }}>
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  )
})
