import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { useStores } from "app/models"
import { SettingsStackProps } from "app/screens"
import { Logout } from "assets/images/logout"
import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, StatusBar, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import Toast from "react-native-toast-message"
import { Button, Switch, Text, View } from "react-native-ui-lib"
import { color, spacing } from "theme"
import {
  AppleSignInButton,
  AppLogo,
  FacebookSignInButton,
  GoogleSignInButton,
  Screen,
} from "../../../components"

const packageJson = require("package.json")
const MARGINS = spacing[4]

export const MainSettingsScreen = observer(function MainSettingsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const navigation = useNavigation<SettingsStackProps<"Main">["navigation"]>()

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <StatusBar barStyle="dark-content" />

      <Section title="App Settings">
        <Divider row arrow onPress={() => navigation.navigate("JokeLength")}>
          <Text text80BO>Joke Length</Text>
        </Divider>

        <Divider row arrow onPress={() => navigation.navigate("Category")}>
          <Text text80BO>Blocked Categories</Text>
        </Divider>

        <Divider row>
          <Text text80BO>Profanity Filter</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>
      </Section>

      {/*
        <Divider>
          <JokeLengthSetting />
        </Divider>

        <Divider>
          <CategorySetting />
        </Divider>
      */}

      <Section title="Notifications">
        <Divider row>
          <Text text80BO>Push Notifications</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>
      </Section>

      <Section title="Account">
        <LoginConversion />

        <Divider>
          <Link>Privacy Policy</Link>
        </Divider>

        <Divider>
          <Link>Terms of Service</Link>
        </Divider>

        <Divider>
          <Link>Data Policy</Link>
        </Divider>

        <Divider>
          <Link>Clear Cache Data</Link>
        </Divider>

        <Divider>
          <BugReport />
        </Divider>
      </Section>

      <Section style={{ marginTop: spacing[5] }}>
        <LogoutButton />
      </Section>

      <AppVersion />
      <Button label="Delete Account" br10 marginH backgroundColor="white" red10 />
    </Screen>
  )
})

const Arrow = () => {
  return <Text grey30>{">"}</Text>
}

type SectionProps = {
  children: React.ReactNode
  title?: string
  style?: ViewStyle | ViewStyle[]
}
const Section = ({ children, title, style }: SectionProps) => {
  return (
    <View {...{ style }}>
      {!!title && <Title>{title}</Title>}
      <View style={SECTION}>{children}</View>
    </View>
  )
}

const Link = ({ children }: { children: string }) => {
  return <Button link style={LINK} label={children} />
}

type DividerProps = {
  children?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress?: () => void
  row?: boolean
  arrow?: boolean
}
const Divider = ({
  children,
  style: styleProp,
  onPress,
  row = false,
  arrow = false,
}: DividerProps) => {
  const style = [DIVIDER, row ? ROW : {}, styleProp]
  return (
    <>
      {onPress ? (
        <TouchableOpacity {...{ style, onPress }}>
          {children}
          {arrow && <Arrow />}
        </TouchableOpacity>
      ) : (
        <View {...{ style }}>
          {children}
          {arrow && <Arrow />}
        </View>
      )}
    </>
  )
}

const Title = ({ children }: { children: string }) => {
  return (
    <Text style={TITLE} grey30>
      {children}
    </Text>
  )
}

const DIVIDER: ViewStyle = {
  borderBottomColor: color.background,
  borderBottomWidth: 1,
}

const LINK: ViewStyle = {
  paddingVertical: spacing[3],
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  paddingBottom: spacing[5],
}

const TITLE: TextStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: MARGINS,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  position: "relative",
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
  if (!auth().currentUser?.isAnonymous) return null

  const onSuccess = (provider: string) => {
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: `Next time you log in select the ${provider} login button.`,
      position: "bottom",
    })
  }

  return (
    <View style={LOGIN_CONVERSION} center>
      <View>
        <Text text60BO>Link Account</Text>
        <Text>
          Convert your guest account using a social media identity to save your bookmarks and
          preferences.
        </Text>
      </View>

      <View style={SOCIAL_BUTTONS} center>
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
  paddingVertical: spacing[4],
  justifyContent: "space-around",
  width: "75%",
}

const BugReport = () => {
  const mail = `mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report AppID: ${packageJson.version} Env: ${process.env.NODE_ENV}&body=App Version: ${packageJson.version}, ${process.env.NODE_ENV}\n\nPlease explain the issue you experienced.`
  return (
    <Button
      label="Bug Report"
      // style={BUG_REPORT_BUTTON}
      // textStyle={BUG_BUTTON_TEXT}
      red10
      backgroundColor="transparent"
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
    <View paddingV-s3>
      <AppLogo />
      <Text style={APP_VERSION}>
        App Version: {packageJson.version}, {process.env.NODE_ENV}
      </Text>
    </View>
  )
}
const APP_VERSION: TextStyle = {
  textAlign: "center",
  color: "grey",
  fontSize: 12,
}
