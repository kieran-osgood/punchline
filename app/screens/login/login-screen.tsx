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
  Screen,
  TroubleSigningInButton,
} from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import { BackHandler, StyleSheet, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Toast from "react-native-toast-message"
import { Text, ThemeManager, View } from "react-native-ui-lib"
import { color } from "theme"

export type LoginResponse = Promise<FirebaseAuthTypes.User | null>
export type ExtractPromiseValue<T> = T extends PromiseLike<infer U> ? U : never
export type SuccessCallback = (provider: string, user: FirebaseAuthTypes.User) => void
export type ErrorCallback = (error: Error) => void

export const LoginScreen = observer(function LoginScreen() {
  // pre-fetch for the onboarding screens
  // useQuery((store) => store.queryCategories({}, (c) => c.nodes((nodes) => nodes.id.image.name)))
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      setIsLoading(false)
      return false
    })

    return () => backHandler.remove()
  }, [])

  if (isLoading) {
    return <LoadingModal />
  }

  return (
    <Screen style={ROOT} preset="fixed" testID="LoginScreen" unsafe>
      <View centerH spread flex-1 width={widthPercentageToDP("70%")}>
        <View flex-1 centerV>
          <AppLogo
            width={widthPercentageToDP("100%")}
            height={widthPercentageToDP("100%") / 5}
            color="hsla(355, 100%,100%, 1)"
          />
        </View>
        <View flex-1 centerH width="100%">
          <Text white text90BO>
            {"By signing in you give consent to our "}
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

        <View marginV-s6>
          <TroubleSigningInButton {...{ onError }} />
        </View>
      </View>
      <GradientBackground style={BACKGROUND} />
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
