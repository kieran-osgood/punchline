import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Logout } from "assets/images/logout"
import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { BUG_REPORT_EMAIL } from "react-native-dotenv"
import { color, spacing } from "theme"
import {
  Button,
  CategorySetting,
  CenterView,
  FacebookSignInButton,
  GoogleSignInButton,
  JokeLengthSetting,
  Screen,
  Text,
} from "../../components"

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <JokeLengthSetting />
      <CategorySetting />
      {auth().currentUser?.isAnonymous && <LoginConversion />}
      <LogoutButton />
      <BugReport />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[5],
}

const LogoutButton = () => {
  const { resetStores } = useStores()
  return (
    <TouchableOpacity style={LOGOUT_BUTTON_CONTAINER} onPress={() => resetStores()}>
      <Logout scale={1} />
      <Text style={LOGOUT_TEXT_CONTAINER}>
        <Text text="Logout" style={LOGOUT_BUTTON} />
      </Text>
    </TouchableOpacity>
  )
}

const LOGOUT_BUTTON_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
}

const LOGOUT_BUTTON: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
  textAlign: "left",
}

const LOGOUT_TEXT_CONTAINER: TextStyle = {
  marginLeft: spacing[3],
}

const LoginConversion = () => (
  <CenterView style={LOGIN_CONVERSION}>
    <Text h3 bold>
      Link Account
    </Text>
    <Text
      style={{ fontSize: 12 }}
      text="Currently signed in as a guest. In order to save your bookmarks and history, link a social media authentication provider below"
    />
    <GoogleSignInButton isAnonymousConversion />
    <FacebookSignInButton isAnonymousConversion />
  </CenterView>
)

const LOGIN_CONVERSION: ViewStyle = {
  paddingBottom: spacing[4],
  width: "100%",
}

const BugReport = () => (
  <Button
    text="Bug Report"
    style={BUG_REPORT_BUTTON}
    textStyle={BUG_BUTTON_TEXT}
    onPress={() => Linking.openURL(BUG_REPORT_EMAIL)}
  />
)

const BUG_REPORT_BUTTON: ViewStyle = {
  backgroundColor: "transparent",
}

const BUG_BUTTON_TEXT: TextStyle = {
  fontSize: 13,
  color: color.error,
  textAlign: "center",
}
