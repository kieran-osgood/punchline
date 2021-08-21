import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Logout } from "assets/images/logout"
import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, Switch, TextStyle, View, ViewStyle } from "react-native"
import Toast from "react-native-toast-message"
import { Button } from "react-native-ui-lib"
import { color, spacing } from "theme"
import {
  AppleSignInButton,
  CategorySetting,
  FacebookSignInButton,
  GoogleSignInButton,
  JokeLengthSetting,
  Screen,
  Text,
} from "../../components"

const packageJson = require("package.json")
const MARGINS = spacing[4]

export const SettingsScreen = observer(function SettingsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Text style={TITLE}>App Settings</Text>
      <View style={SECTION}>
        <JokeLengthSetting />
        <CategorySetting />
      </View>

      {/* <Text>Profanity Filter</Text> */}
      {/* <Text>Hidden Words</Text> */}

      <Text style={TITLE}>Notifications</Text>
      <View style={[SECTION, ROW]}>
        <View>
          <Text>Push Notifications</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: color.primary }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Text style={TITLE}>Account</Text>
      <View style={SECTION}>
        <Link>Privacy Policy</Link>
        <Link>Terms of Service</Link>
        <Link>Data Policy</Link>
        <Link>Clear Cache Data</Link>
      </View>

      <View style={SECTION}>
        {auth().currentUser?.isAnonymous && <LoginConversion />}
        <LogoutButton />
        <BugReport />
      </View>
      <AppVersion />
    </Screen>
  )
})

const Link = ({ children }: { children: string }) => {
  return <Button link style={LINK} label={children} />
}

const LINK: ViewStyle = {
  paddingVertical: spacing[3],
  borderBottomColor: color.background,
  borderBottomWidth: 1,
}
const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: spacing[5],
}
const TITLE: TextStyle = {
  paddingVertical: spacing[3],
  fontWeight: "500",
  paddingHorizontal: MARGINS,
}
const ROW: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing[2],
}
const SECTION: ViewStyle = {
  backgroundColor: "white",
  paddingHorizontal: MARGINS,
}

const LogoutButton = () => {
  const { resetStores } = useStores()
  return (
    <Button
      label="Logout"
      style={LOGOUT_BUTTON_CONTAINER}
      labelStyle={LOGOUT_BUTTON}
      onPress={resetStores}
      iconSource={() => <Logout scale={1} />}
    />
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

const LoginConversion = () => {
  const onSuccess = (provider: string) => {
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: `Next time you log in select the ${provider} login button.`,
      position: "bottom",
    })
  }

  return (
    <View style={LOGIN_CONVERSION}>
      <Text h4 bold>
        Link Account
      </Text>
      <Text
        style={{ fontSize: 12 }}
        text="Convert your guest account using a social media identity to save your bookmarks and preferences."
      />
      <View style={SOCIAL_BUTTONS}>
        <GoogleSignInButton isAnonymousConversion {...{ onSuccess }} />
        <FacebookSignInButton isAnonymousConversion {...{ onSuccess }} />
        <AppleSignInButton isAnonymousConversion {...{ onSuccess }} />
      </View>
    </View>
  )
}

const LOGIN_CONVERSION: ViewStyle = {
  paddingBottom: spacing[4],
  width: "100%",
}

const SOCIAL_BUTTONS: ViewStyle = {
  flexDirection: "row",
}

const BugReport = () => {
  const mail = `mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report AppID: ${packageJson.version} Env: ${process.env.NODE_ENV}&body=App Version: ${packageJson.version}, ${process.env.NODE_ENV}\n\nPlease explain the issue you experienced.`
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
