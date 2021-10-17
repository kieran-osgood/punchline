import { ParamListBase } from "@react-navigation/native"
import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack"
import { BackButton } from "components"
import { AccountIcon, SettingsIcon } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, TouchableOpacity, View } from "react-native-ui-lib"
import { color } from "theme"
import { AppLogo } from "../app-logo/app-logo"

export type HeaderProps = {
  navigation: StackNavigationProp<ParamListBase>
  left?: "account" | "back"
  right?: "settings" | "back"
} & StackHeaderProps

/**
 * Header component
 */
export const Header = observer(function Header({ navigation, left, right, ...rest }: HeaderProps) {
  const insets = useSafeAreaInsets()
  const style = { paddingTop: insets.top > 15 ? insets.top : 15 }

  const onPress = () => navigation.goBack()

  return (
    <View style={[CONTAINER, style]} backgroundColor={color.background}>
      <View height={40} row paddingB-s1>
        <View flex-1 center>
          {left === "back" && <BackButton {...{ onPress }} />}
          {left === "account" && (
            <TouchableOpacity style={BUTTON} onPress={() => navigation.navigate("UserProfileTabs")}>
              <AccountIcon />
            </TouchableOpacity>
          )}
        </View>

        <View flex-4 center>
          {typeof rest.options.headerTitle === "string" ? (
            <Text text70BO>{rest.options.headerTitle}</Text>
          ) : (
            <AppLogo style={LOGO} height={25} />
          )}
        </View>

        <View centerH flex-1>
          {right === "settings" ? (
            <TouchableOpacity style={BUTTON} onPress={() => navigation.navigate("SettingsStack")}>
              <SettingsIcon />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {right === "back" && <BackButton reverse {...{ onPress }} />}
        </View>
      </View>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  borderBottomColor: color.line,
  borderBottomWidth: StyleSheet.hairlineWidth,
}
const LOGO: ViewStyle = {
  alignItems: "center",
}
const BUTTON: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}
