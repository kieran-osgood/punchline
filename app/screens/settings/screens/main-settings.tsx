import AsyncStorage from "@react-native-async-storage/async-storage"
import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/core"
import * as Sentry from "@sentry/react-native"
import { useStores } from "app/models"
import { SettingsStackProps } from "app/screens"
import { Logout } from "assets/images/logout"
import RightArrow from "assets/images/right-arrow"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  Alert,
  Linking,
  Platform,
  StatusBar,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { APPSTORE_URL, PLAYSTORE_URL, WEB_URL } from "react-native-dotenv"
import Share from "react-native-share"
import Toast from "react-native-toast-message"
import { Button, Switch, Text, ThemeManager, View, ViewProps } from "react-native-ui-lib"
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
  const navigation = useNavigation<SettingsStackProps<"Main">["navigation"]>()
  const { settings } = useStores()

  const onSharePress = async (url: string) => {
    try {
      await Share.open({
        title: "",
        url,
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <StatusBar barStyle="dark-content" />

      <Section title="Preferences">
        <Divider row arrow onPress={() => navigation.navigate("JokePreferences")}>
          <Text text90R>Content</Text>
        </Divider>

        <Divider row>
          <Text text90R>Profanity Filter</Text>
          <Switch
            onValueChange={() => settings.setProfanityFilter(!settings.profanityFilter)}
            value={settings.profanityFilter}
          />
        </Divider>

        <Divider row>
          <Text text90R>Notifications</Text>
          <Switch
            onValueChange={() => settings.setNotification("push", !settings.notifications.push)}
            value={settings.notifications.push}
          />
        </Divider>
      </Section>

      {/* <Section title="Notifications">
        <Divider row>
          <Text text90R>Push Notifications</Text>
          <Switch
            onValueChange={() => settings.setNotification("push", !settings.notifications.push)}
            value={settings.notifications.push}
          />
        </Divider>

        <Divider row>
          <Text text90R>Email</Text>
          <Switch
            onValueChange={() => settings.setNotification("email", !settings.notifications.email)}
            value={settings.notifications.email}
          />
        </Divider>

        <Divider row>
          <Text text90R>Team</Text>
          <Switch
            onValueChange={() => settings.setNotification("team", !settings.notifications.team)}
            value={settings.notifications.team}
          />
        </Divider>
      </Section> */}

      <Section title="More Information">
        <Divider>
          <Link external url={Platform.OS === "ios" ? APPSTORE_URL : PLAYSTORE_URL}>
            Rate Us
          </Link>
        </Divider>
        <Divider>
          <Link
            onPress={() => onSharePress(Platform.OS === "ios" ? APPSTORE_URL : PLAYSTORE_URL)}
            external
          >
            {/* Not ideal - we have the in-app share pop up but thats not reliable so just link to store */}
            Share Punchline
          </Link>
        </Divider>
        <Divider>
          <Link url={`/terms-of-service.html`}>Terms of Service</Link>
        </Divider>
        <Divider>
          <Link url={`/privacy-policy.html`}>Privacy Policy</Link>
        </Divider>
        {/* <Divider>
          <Link url={`/data-policy.html`}>Data Policy</Link>
        </Divider> */}
      </Section>

      <Section title="Account">
        <View>
          {auth().currentUser?.isAnonymous && (
            <Divider>
              <LoginConversion />
            </Divider>
          )}
          <Divider>
            <Link
              onPress={() => {
                Alert.alert("Clear Cache", "Confirm you wish you clear data saved to device.", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => AsyncStorage.clear(),
                  },
                ])
              }}
            >
              Clear Cache Data
            </Link>
          </Divider>
          <Divider>
            <BugReport />
          </Divider>
          <LogoutButton />
        </View>
      </Section>

      <AppVersion />
      <Button label="Delete Account" br10 marginH backgroundColor="white" red10 labelStyle={{}} />
    </Screen>
  )
})

type SectionProps = {
  children: React.ReactNode
  title?: string
  style?: ViewStyle | ViewStyle[]
} & ViewProps
export const Section = ({ children, title, style, ...rest }: SectionProps) => {
  return (
    <View {...{ style }} {...rest}>
      {!!title && <Title>{title}</Title>}
      <View style={SECTION}>{children}</View>
    </View>
  )
}

type LinkProps = {
  children: string
  onPress?: (...args: any[]) => any
  url?: string
  external?: boolean
  inlineText?: boolean
}
export const Link = ({
  children,
  onPress: onPressCallback,
  url,
  external = false,
  inlineText = false,
}: LinkProps) => {
  const onPress = () => {
    const fullUrl = external ? `${url}` : `${WEB_URL}${url}`

    Linking.canOpenURL(fullUrl).then((supported) => {
      if (supported) {
        Linking.openURL(fullUrl)
      } else {
        Sentry.captureMessage("Don't know how to open URI: " + fullUrl)
      }
    })
    onPressCallback?.()
  }

  if (inlineText) {
    return (
      <Text style={TEXT_LINK} {...{ onPress }}>
        {children}
      </Text>
    )
  }
  return <Button link style={LINK} label={children} {...{ onPress }} />
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
    <Text style={TITLE} grey30 text90L>
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
const TEXT_LINK: TextStyle = {
  textDecorationLine: "underline",
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
  const { resetStore } = useStores()
  const onPress = () => {
    if (auth().currentUser?.isAnonymous) {
      Alert.alert(
        "Confirm Logout",
        "Before signing out, link your guest account with a social provider?",
        [{ text: "Cancel" }, { text: "Logout", onPress: resetStore }],
      )
    } else {
      resetStore()
    }
  }

  return (
    <Button
      label="Logout"
      text70BO
      enableShadow
      backgroundColor="transparent"
      labelStyle={{}}
      color={ThemeManager.titleColor}
      iconSource={() => <Logout scale={1} />}
      {...{ onPress }}
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

  const onError = (error: Error) => {
    Sentry.captureException(error)

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      position: "bottom",
    })
  }

  return (
    <View marginT-s5>
      <View>
        <Text text60BO>Link Social Account</Text>
        <Text marginT-s2>
          Convert your guest account using a social media identity to save your bookmarks and
          preferences.
        </Text>
      </View>
      <View paddingV-s6 flex-1 width="100%" center>
        <View width="70%">
          <GoogleSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
          <FacebookSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
          <AppleSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
        </View>
      </View>
    </View>
  )
}

const BugReport = () => {
  const navigation = useNavigation<SettingsStackProps<"Main">["navigation"]>()

  return (
    <Button
      label="Bug Report"
      red10
      backgroundColor="transparent"
      onPress={() => navigation.navigate("BugReport")}
    />
  )
}

const AppVersion = () => {
  return (
    <View paddingV-s10>
      <AppLogo />
      <Text center grey40 marginT-s2 text90R>
        App Version: {packageJson.version}, {process.env.NODE_ENV}
      </Text>
    </View>
  )
}
