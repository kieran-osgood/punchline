import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { useStores } from "app/models"
import { SettingsStackProps } from "app/screens"
import { Logout } from "assets/images/logout"
import RightArrow from "assets/images/right-arrow"
import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, StatusBar, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import Toast from "react-native-toast-message"
import { Button, Switch, Text, ThemeManager, View, ViewPropTypes } from "react-native-ui-lib"
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
          <Text text80>Joke Length</Text>
        </Divider>

        <Divider row arrow onPress={() => navigation.navigate("Category")}>
          <Text text80>Blocked Categories</Text>
        </Divider>

        <Divider row>
          <Text text80>Profanity Filter</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>
      </Section>

      <Section title="Notifications">
        <Divider row>
          <Text text80>Push Notifications</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>

        <Divider row>
          <Text text80>Email</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>

        <Divider row>
          <Text text80>Team</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </Divider>
      </Section>

      <Section title="Account">
        <Divider>
          <LoginConversion />
        </Divider>
        <Divider>
          <BugReport />
        </Divider>
      </Section>

      <Section title="More Information">
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
      </Section>

      <Section marginT-s5 marginH-s5>
        <Link>Rate Us</Link>
      </Section>

      <Section marginT-s5 marginH-s5>
        <Link>Share Punchline</Link>
      </Section>

      <Section marginT-s5 marginH-s5>
        <LogoutButton />
      </Section>

      <AppVersion />
      <Button label="Delete Account" br10 marginH backgroundColor="white" red10 />
    </Screen>
  )
})

type SectionProps = {
  children: React.ReactNode
  title?: string
  style?: ViewStyle | ViewStyle[]
} & ViewPropTypes
const Section = ({ children, title, style, ...rest }: SectionProps) => {
  return (
    <View {...{ style }} {...rest}>
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
          {arrow && <RightArrow />}
        </TouchableOpacity>
      ) : (
        <View {...{ style }}>
          {children}
          {arrow && <RightArrow />}
        </View>
      )}
    </>
  )
}

const Title = ({ children }: { children: string }) => {
  return (
    <Text style={TITLE} grey40 text90>
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
      text70BO
      enableShadow
      backgroundColor="transparent"
      color={ThemeManager.titleColor}
      onPress={resetStores}
      iconSource={() => <Logout scale={1} />}
    />
  )
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
    <View center paddingB-s3>
      <View>
        <Text text60BO>Link Account</Text>
        <Text>
          Convert your guest account using a social media identity to save your bookmarks and
          preferences.
        </Text>
      </View>
      <View row paddingV-s6 spread width="60%">
        <GoogleSignInButton isAnonymousConversion {...{ onSuccess }} />
        <FacebookSignInButton isAnonymousConversion {...{ onSuccess }} />
        <AppleSignInButton isAnonymousConversion {...{ onSuccess }} />
      </View>
    </View>
  )
}

const BugReport = () => {
  const mail = `mailto:ko.dev.issues@gmail.com?subject=Punchline Bug Report AppID: ${packageJson.version} Env: ${process.env.NODE_ENV}&body=App Version: ${packageJson.version}, ${process.env.NODE_ENV}\n\nPlease explain the issue you experienced.`
  return (
    <Button
      label="Bug Report"
      red10
      backgroundColor="transparent"
      onPress={() => Linking.openURL(mail)}
    />
  )
}

const AppVersion = () => {
  return (
    <View paddingV-s10>
      <AppLogo />
      <Text center grey10 marginT-s2 text90>
        App Version: {packageJson.version}, {process.env.NODE_ENV}
      </Text>
    </View>
  )
}
