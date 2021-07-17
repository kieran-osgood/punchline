import React from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, ViewStyle } from "react-native"
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
import { color, spacing } from "theme"
import auth from "@react-native-firebase/auth"
import { BUG_REPORT_EMAIL } from "react-native-dotenv"

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

const LogoutButton = () => (
  <Button
    text="Logout"
    // style={PILL_BUTTON}
    textStyle={LOGOUT_BUTTON}
    onPress={() => auth().signOut()}
  />
)

const LOGOUT_BUTTON: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
  textAlign: "center",
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
    <GoogleSignInButton isAnonymousConversion={true} />
    <FacebookSignInButton isAnonymousConversion={true} />
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
