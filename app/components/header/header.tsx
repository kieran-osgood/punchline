import { ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AccountIcon, BackArrowIcon, SettingsIcon } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { color } from "theme"
import { AppLogo } from "../app-logo/app-logo"

export interface HeaderProps {
  navigation: StackNavigationProp<ParamListBase>
  left?: "account" | "back"
  right?: "settings"
}

/**
 * Header component
 */
export const Header = observer(function Header({ navigation, left, right }: HeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[CONTAINER, { paddingTop: insets.top }]}>
      <View style={COL}>
        {left === "back" && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </TouchableOpacity>
        )}
        {left === "account" && (
          <TouchableOpacity onPress={() => navigation.navigate("UserProfileTabs")}>
            <AccountIcon />
          </TouchableOpacity>
        )}
      </View>

      <AppLogo style={[COL, LOGO]} height={25} />

      <View style={COL}>
        {right === "settings" && (
          <TouchableOpacity style={SETTINGS} onPress={() => navigation.navigate("SettingsStack")}>
            <SettingsIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 25,
  paddingBottom: 20,
  backgroundColor: color.background,
  borderBottomColor: color.line,
  borderBottomWidth: StyleSheet.hairlineWidth,
}
const LOGO: ViewStyle = {
  alignItems: "center",
}
const COL: ViewStyle = {
  alignSelf: "center",
  width: "33%",
}
const SETTINGS: ViewStyle = {
  alignItems: "flex-end",
}
