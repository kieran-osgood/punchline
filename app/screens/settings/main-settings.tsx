import AsyncStorage from "@react-native-async-storage/async-storage"
import auth from "@react-native-firebase/auth"
import { JokeLengthSettingSheet } from "app/components/joke-length-sheet/joke-length-setting-sheet"
import { handleOpenLink, Link } from "app/components/link/link"
import { SocialSigninConversionSheet } from "app/components/social-signin-conversion-sheet/social-signin-conversion-sheet"
import useSheetsManager from "app/hooks/use-sheets-manager"
import { useStores } from "app/models"
import { Logout, RightArrow } from "assets/images"
import { observer } from "mobx-react-lite"
import React from "react"
import { Freeze } from "react-freeze"
import { Alert, Platform, StatusBar, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { APPSTORE_URL, PLAYSTORE_URL } from "react-native-dotenv"
import Share from "react-native-share"
import { Button, Switch, Text, ThemeManager, View, ViewProps } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { AppLogo, BugReportSheet, JokeCategoriesSettingSheet, Screen } from "../../components"

const appVersion = require("app.json").expo.version
const MARGINS = spacing[4]

export const MainSettingsScreen = observer(function MainSettingsScreen() {
  const { settings, userStore } = useStores()
  const { open, close, refs, freeze } = useSheetsManager<
    ["jokeLength", "jokeCategoriesRef", "socialSigninConversion", "bugReport"]
  >()

  const onSharePress = async (url: string) => {
    try {
      await Share.open({
        title: "Share Joke",
        url,
      })
    } catch (error) {
      // This is caught but not logged due to: https://github.com/react-native-share/react-native-share/issues/1112
    }
  }

  const onDeleteAccountPress = () => {
    Alert.alert("Confirm Deletion", "Confirm you wish delete the currently logged in account.", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: userStore.deleteSelf },
    ])
  }

  const resetCache = () =>
    Alert.alert("Clear Cache", "Confirm you wish you clear data saved to device.", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => AsyncStorage.clear() },
    ])

  return (
    <>
      <Screen style={ROOT} preset="scroll" unsafe>
        <StatusBar barStyle="dark-content" />

        <Section title="App Preferences">
          <Divider row arrow onPress={() => open("jokeCategoriesRef")}>
            <Text text80>Categories</Text>
          </Divider>

          <Divider row arrow onPress={() => open("jokeLength")}>
            <Text text80>Length Filter</Text>
          </Divider>

          <Divider row>
            <Text text80>Profanity Filter</Text>
            <Switch
              onValueChange={() => settings.setProfanityFilter(!settings.profanityFilter)}
              value={settings.profanityFilter}
            />
          </Divider>

          <Divider row>
            <Text text80>Notifications</Text>
            <Switch
              onValueChange={() => settings.setNotification("push", !settings.notifications.push)}
              value={settings.notifications.push}
            />
          </Divider>
        </Section>

        <Section title="Account">
          {auth().currentUser?.isAnonymous && (
            <Divider row arrow onPress={() => open("socialSigninConversion")}>
              <Text text80>Social Login Conversion</Text>
            </Divider>
          )}
          <Divider row arrow onPress={() => open("bugReport")}>
            <View row>
              {/* BugIcon */}
              <Text>Bug Report</Text>
            </View>
          </Divider>
          <Divider row arrow onPress={resetCache}>
            <View row>
              {/* TrashIcon */}
              <Text red10>Clear Cache Data</Text>
            </View>
          </Divider>
        </Section>

        <Section title="More Information">
          <Divider
            row
            arrow
            onPress={() =>
              handleOpenLink(Platform.OS === "ios" ? APPSTORE_URL : PLAYSTORE_URL, true)
            }
          >
            <View row>
              {/* ExternalLinkIcon */}
              <Text>Rate Us</Text>
            </View>
          </Divider>
          <Divider
            row
            arrow
            // {/* Not ideal - we have the in-app share pop up but thats not reliable so just link to store */}
            onPress={() => onSharePress(Platform.OS === "ios" ? APPSTORE_URL : PLAYSTORE_URL)}
          >
            <View row>
              {/* ExternalLinkIcon */}
              <Text>Share Punchline</Text>
            </View>
          </Divider>
          <Divider row arrow onPress={() => handleOpenLink(`/terms-of-service.html`)}>
            <View row>
              {/* ExternalLinkIcon */}
              <Link>Terms of Service</Link>
            </View>
          </Divider>
          <Divider row arrow onPress={() => handleOpenLink(`/privacy-policy.html`)}>
            <View row>
              {/* ExternalLinkIcon */}
              <Text>Privacy Policy</Text>
            </View>
          </Divider>
        </Section>

        <Section title=" ">
          <LogoutButton onCancel={() => open("socialSigninConversion")} />
        </Section>

        <AppVersion />

        <Button
          label="Delete Account"
          br10
          marginV-s5
          backgroundColor="white"
          red10
          onPress={onDeleteAccountPress}
        />
      </Screen>

      <Freeze {...{ freeze }}>
        <JokeLengthSettingSheet ref={(el) => refs.current.set("jokeLength", el)} />
        <SocialSigninConversionSheet ref={(el) => refs.current.set("socialSigninConversion", el)} />
        <JokeCategoriesSettingSheet ref={(el) => refs.current.set("jokeCategoriesRef", el)} />
        <BugReportSheet ref={(el) => refs.current.set("bugReport", el)} close={() => close()} />
      </Freeze>
    </>
  )
})

type SectionProps = {
  children: React.ReactNode
  title?: string
  style?: ViewStyle | ViewStyle[]
} & ViewProps
export const Section = ({ children, title, style, ...rest }: SectionProps) => (
  <View {...{ style }} {...rest}>
    {!!title && <Title>{title}</Title>}
    <View style={SECTION}>{children}</View>
  </View>
)

type DividerProps = {
  children?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress?: () => void
  row?: boolean
  arrow?: boolean
}
export const Divider = (props: DividerProps) => {
  const { children, style: styleProp, onPress, row = false, arrow = false } = props
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

const Title = ({ children }: { children: string }) => (
  <Text style={TITLE} grey30 text90>
    {children}
  </Text>
)

const DIVIDER: ViewStyle = {
  borderBottomColor: color.background,
  borderBottomWidth: 1,
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
  alignItems: "center",
  paddingVertical: spacing[2],
  justifyContent: "space-between",
}
const SECTION: ViewStyle = {
  backgroundColor: "white",
  paddingHorizontal: MARGINS,
}

const AppVersion = () => {
  return (
    <View paddingV-s10>
      <AppLogo />
      <Text center grey40 marginT-s2 text90 bold>
        App Version: {appVersion}, {process.env.NODE_ENV}
      </Text>
    </View>
  )
}

const LogoutButton = ({ onCancel }: { onCancel: () => void }) => {
  const { resetStore } = useStores()
  const onPress = () => {
    if (auth().currentUser?.isAnonymous) {
      Alert.alert(
        "Confirm Logout",
        "Before signing out, link your guest account with a social provider?",
        [
          { text: "Cancel", onPress: onCancel },
          { text: "Logout", onPress: resetStore },
        ],
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
