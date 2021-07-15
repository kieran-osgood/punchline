import { observer } from "mobx-react-lite"
import { AppLogo } from "../app-logo/app-logo"
import React from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { AccountIcon, BackArrowIcon, SettingsIcon } from "images"
import { ParamListBase } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { color } from "theme"
import { StackNavigationProp } from "@react-navigation/stack"

export interface HeaderProps {
  navigation: StackNavigationProp<ParamListBase>
  left?: "account" | "back"
  right?: "settings"
}

/**
 * Header component
 */
export const Header = observer(function Header({ navigation, left, right }: HeaderProps) {
  return (
    <SafeAreaView style={CONTAINER}>
      <View style={COL}>
        {left === "back" && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </TouchableOpacity>
        )}
        {left === "account" && (
          <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
            <AccountIcon />
          </TouchableOpacity>
        )}
      </View>

      <AppLogo style={[COL, LOGO]} height={hp("3%")} />

      <View style={COL}>
        {right === "settings" && (
          <TouchableOpacity style={SETTINGS} onPress={() => navigation.navigate("SettingsScreen")}>
            <SettingsIcon />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 25,
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
