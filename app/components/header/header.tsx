import { observer } from "mobx-react-lite"
import { AppLogo } from "../app-logo/app-logo"
import React from "react"
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { AccountIcon, BackArrowIcon, SettingsIcon } from "images"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"
import { SafeAreaView } from "react-native-safe-area-context"
import { color } from "theme"

export interface HeaderProps {}

/**
 * Header component
 */
export const Header = observer(function Header(props: HeaderProps) {
  const navigation = useNavigation<NavigationProps<"JokeScreen">["navigation"]>()
  return (
    <SafeAreaView
      style={[
        CONTAINER,
        {
          backgroundColor: color.background,
          borderBottomColor: color.line,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      {navigation.canGoBack() ? (
        <TouchableOpacity style={COL} onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={COL} onPress={() => navigation.navigate("UserProfileScreen")}>
          <AccountIcon />
        </TouchableOpacity>
      )}

      <AppLogo style={{ ...COL, ...LOGO }} height={hp("3%")} />

      <TouchableOpacity
        style={{ ...COL, ...SETTINGS }}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        {!navigation.canGoBack() && <SettingsIcon />}
      </TouchableOpacity>
    </SafeAreaView>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 25,
}
const LOGO: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
}
const COL: ViewStyle = {
  alignSelf: "center",
  width: "33%",
}
const SETTINGS: ViewStyle = {
  justifyContent: "flex-end",
  flexDirection: "row",
}
