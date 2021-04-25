import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { color } from "theme"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Icon from "react-native-vector-icons/AntDesign"
import { BookmarksScreen } from "../bookmarks/bookmarks-screen"
import { HistoryScreen } from "../history/history-screen"
import { Screen } from "../../components"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const TAB_STYLE: ViewStyle = {
  backgroundColor: color.background,
}

export type UserProfileRouteParamList = {
  Bookmarks: undefined
  History: undefined
}

const Tab = createMaterialTopTabNavigator<UserProfileRouteParamList>()

export const UserProfileScreen = observer(function UserProfileScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <Tab.Navigator
        tabBarOptions={{
          style: TAB_STYLE,
          showIcon: true,
          indicatorStyle: {
            borderBottomColor: "#87B56A",
            borderBottomWidth: 4,
          },
        }}
      >
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{
            tabBarIcon: function TabIcon({ color: tabBarColor = "#fff" }) {
              return <Icon name="staro" size={25} color={tabBarColor} />
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: function TabIcon({ color: tabBarColor = "#fff" }) {
              return <Icon name="book" size={25} color={tabBarColor} />
            },
          }}
        />
      </Tab.Navigator>
    </Screen>
  )
})
