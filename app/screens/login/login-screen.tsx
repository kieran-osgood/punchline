import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import {
  AppleSignInButton,
  AppLogo,
  FacebookSignInButton,
  GoogleSignInButton,
  GradientBackground,
  GuestSignInButton,
  Link,
  LoadingModal,
  OptionsBottomSheet,
  Screen,
  TroubleSigningInButton,
  TroubleSigningInSheet,
} from "components"
import * as Updates from "expo-updates"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { BackHandler, StyleSheet, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Toast from "react-native-toast-message"
import { Button, Text, ThemeManager, View } from "react-native-ui-lib"
import { color } from "theme"

export type LoginResponse = Promise<FirebaseAuthTypes.User | null>
export type ExtractPromiseValue<T> = T extends PromiseLike<infer U> ? U : never
export type SuccessCallback = (provider: string, user: FirebaseAuthTypes.User) => void
export type ErrorCallback = (error: Error) => void

export const LoginScreen = observer(function LoginScreen() {
  // pre-fetch for the onboarding screens
  // useQuery((store) => store.queryCategories({}, (c) => c.nodes((nodes) => nodes.id.image.name)))
  const ref = React.useRef<OptionsBottomSheet | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [state, setState] = React.useState({})
  const forceUpdate = React.useCallback(() => setState({}), [])
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      setIsLoading(false)
      return false
    })

    return () => backHandler.remove()
  }, [])

  const [updateAvailable, setUpdateAvailable] = React.useState(false)
  const [updateManifest, setUpdateManifest] = React.useState({})
  const [check, setCheck] = React.useState(0)
  React.useEffect(() => {
    const timer = setInterval(async () => {
      setCheck((c) => c + 1)
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        setUpdateAvailable(true)
        setUpdateManifest(update.manifest || {})
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return <LoadingModal />
  }

  return (
    <Screen style={ROOT} preset="scroll" testID="LoginScreen" unsafe>
      <View centerH spread flex-1 width={widthPercentageToDP("70%")}>
        <View flex-1 centerV>
          <AppLogo
            width={widthPercentageToDP("100%")}
            height={widthPercentageToDP("100%") / 5}
            color="hsla(355, 100%,100%, 1)"
          />
        </View>
        <Button onPress={forceUpdate} label="Update" />
        <Text white>
          <Text>Expo update: {Updates.updateId}</Text>
          {"\n"}
          <Text>Update available? {updateAvailable ? "true" : "false"}</Text>
          {"\n"}
          <Text>Commit Time: {updateManifest.commitTime}</Text>
          {"\n"}
          <Text>Checked: {String(check)}</Text>
          {"\n"}
          <Text>Update manifest: {JSON.stringify(updateManifest || {})}</Text>
        </Text>

        <View flex-1 centerH width="100%">
          <Text white text90>
            {"By signing in you give consent to our \n"}
            <Link url={`/terms-of-service.html`} inlineText>
              {"Terms of Service"}
            </Link>
            {" and "}
            <Link url={`/privacy-policy.html`} inlineText>
              {"Privacy Policy"}
            </Link>
            {"."}
          </Text>

          <View spread>
            <GoogleSignInButton {...{ setIsLoading, onError }} />
            <FacebookSignInButton {...{ setIsLoading, onError }} />
            <AppleSignInButton {...{ setIsLoading, onError }} />
          </View>

          <View style={SPACER} marginV-s6 height-0 />

          <GuestSignInButton />
        </View>

        <View paddingV-s6>
          <TroubleSigningInButton {...{ onError }} onPress={() => ref.current?.open()} />
        </View>
      </View>
      <GradientBackground style={BACKGROUND} />
      <TroubleSigningInSheet ref={ref} onError={onError} />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  justifyContent: "space-between",
  alignItems: "center",
}
const SPACER: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: ThemeManager.titleColor,
  borderWidth: StyleSheet.hairlineWidth,
  width: 50,
}
const BACKGROUND: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
  height: "100%",
}

const onError: ErrorCallback = (error: Error) => {
  Sentry.captureException(error)

  Toast.show({
    type: "error",
    text1: "Error",
    text2: error.message,
    position: "bottom",
  })
}
