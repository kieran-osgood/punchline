import { ParamListBase } from "@react-navigation/native"
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack"
import { AccountIcon, BackArrowIcon, SettingsIcon } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, View } from "react-native-ui-lib"
import { color } from "theme"
import { AppLogo } from "../app-logo/app-logo"

export type HeaderProps = {
  navigation: StackNavigationProp<ParamListBase>
  left?: "account" | "back"
  right?: "settings"
  center?: "logo" | "title"
} & StackHeaderProps

/**
 * Header component
 */
export const Header = observer(function Header({
  navigation,
  left,
  right,
  center = "logo",
  ...rest
}: HeaderProps) {
  const insets = useSafeAreaInsets()
  const style = { paddingTop: insets.top < 30 ? 30 : insets.top }
  return (
    <View style={[CONTAINER, style]}>
      <View style={COL}>
        {left === "back" && (
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
        )}
        {left === "account" && (
          <TouchableOpacity onPress={() => navigation.navigate("UserProfileTabs")}>
            <AccountIcon />
          </TouchableOpacity>
        )}
      </View>

      {typeof rest.options.headerTitle === "string" ? (
        <Text text70BO>{rest.options.headerTitle}</Text>
      ) : (
        <AppLogo style={[COL, LOGO]} height={25} />
      )}

      <View style={COL}>
        {right === "settings" && (
          <TouchableOpacity style={SETTINGS} onPress={() => navigation.navigate("SettingsStack")}>
            <SettingsIcon />
          </TouchableOpacity>
        )}
        <View />
      </View>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 25,
  paddingBottom: 15,
  backgroundColor: color.background,
  borderBottomColor: color.line,
  borderBottomWidth: StyleSheet.hairlineWidth,
}
const LOGO: ViewStyle = {
  alignItems: "center",
}
const COL: ViewStyle = {
  minWidth: 25,
}
const SETTINGS: ViewStyle = {
  alignItems: "flex-end",
}
