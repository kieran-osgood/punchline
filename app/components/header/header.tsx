import { observer } from "mobx-react-lite"
import { AppLogo } from "../app-logo/app-logo"
import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { AccountIcon, BackArrowIcon, SettingsIcon } from "images"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"

export interface HeaderProps {}

/**
 * Header component
 */
export const Header = observer(function Header(props: HeaderProps) {
  const navigation = useNavigation<NavigationProps<"JokeScreen">["navigation"]>()
  const canGoBack = navigation.canGoBack()
  return (
    <View style={CONTAINER}>
      <TouchableOpacity style={COL}>
        {canGoBack ? <BackArrowIcon /> : <AccountIcon />}
      </TouchableOpacity>

      <AppLogo style={{ ...COL, ...LOGO }} height={hp("3%")} />

      <TouchableOpacity style={{ ...COL, ...SETTINGS }}>
        {!canGoBack && <SettingsIcon />}
      </TouchableOpacity>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 5,
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
