import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Logout } from "assets/images/logout"
import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, TextStyle, ViewStyle } from "react-native"
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

const packageJson = require("package.json")

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <JokeLengthSetting />
      <CategorySetting />
      {auth().currentUser?.isAnonymous && <LoginConversion />}
      <LogoutButton />
      <BugReport />
      <AppVersion />
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
    <Button
      text="Bug Report"
      style={LOGOUT_BUTTON_CONTAINER}
      textStyle={LOGOUT_BUTTON}
      onPress={() => resetStores()}
    >
      <Logout scale={1} />
      <Text text="Logout" style={LOGOUT_BUTTON} />
    </Button>
  )
}

const LOGOUT_BUTTON_CONTAINER: ViewStyle = {
  alignItems: "center",
  backgroundColor: "transparent",
  flexDirection: "row",
}

const LOGOUT_BUTTON: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
  marginLeft: spacing[3],
  width: "25%",
}

const LoginConversion = () => (
  <CenterView style={LOGIN_CONVERSION}>
    <Text h3 bold>
      Link Account
    </Text>
    <Text
      style={{ fontSize: 12 }}
      text="Convert your guest account using a social media identity to save your bookmarks and preferences."
    />
    <GoogleSignInButton isAnonymousConversion />
    <FacebookSignInButton isAnonymousConversion />
  </CenterView>
)

const LOGIN_CONVERSION: ViewStyle = {
  paddingBottom: spacing[4],
  width: "100%",
}

const BugReport = () => {
  const mail = `mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report AppID: ${packageJson.version} Env:${process.env.NODE_ENV}&body=App Version: ${packageJson.version}, ${process.env.NODE_ENV}\n\nPlease explain the issue you experienced.`
  return (
    <Button
      text="Bug Report"
      style={BUG_REPORT_BUTTON}
      textStyle={BUG_BUTTON_TEXT}
      onPress={() => Linking.openURL(mail)}
    />
  )
}

const BUG_REPORT_BUTTON: ViewStyle = {
  backgroundColor: "transparent",
}

const BUG_BUTTON_TEXT: TextStyle = {
  fontSize: 13,
  color: color.error,
  textAlign: "center",
}

const AppVersion = () => {
  return (
    <Text style={APP_VERSION}>
      App Version: {packageJson.version}, {process.env.NODE_ENV}
    </Text>
  )
}
const APP_VERSION: TextStyle = {
  textAlign: "center",
  color: "grey",
  fontSize: 12,
}
