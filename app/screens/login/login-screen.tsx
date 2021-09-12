import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import MeshBackground from "assets/images/mesh-background"
import {
  AppleSignInButton,
  AppLogo,
  FacebookSignInButton,
  GoogleSignInButton,
  GuestSignInButton,
  LoadingModal,
  Screen,
} from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import { BackHandler, TextStyle, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Toast from "react-native-toast-message"
import { Button, Text, ThemeManager, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

export type LoginResponse = Promise<FirebaseAuthTypes.User | null>
export type ExtractPromiseValue<T> = T extends PromiseLike<infer U> ? U : never
export type SuccessCallback = (provider: string, user: FirebaseAuthTypes.User) => void
export type ErrorCallback = (error: Error) => void

export const LoginScreen = observer(function LoginScreen() {
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      setIsLoading(false)
      return false
    })

    return () => backHandler.remove()
  }, [])

  const handleTroubleLoggingIn = async () => {
    console.log("print")
    return auth().sendSignInLinkToEmail("kieranbosgood@gmail.com", {
      handleCodeInApp: true,
      url: "app/email-login",
      iOS: {
        bundleId: "com.ko.punchline",
      },
      android: {
        packageName: "com.ko.punchline",
        installApp: true,
        minimumVersion: "12",
      },
      dynamicLinkDomain: "web.punch-line.co.uk",
    })

    // const authz = auth()
    // sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //   .then(() => {
    //     // The link was successfully sent. Inform the user.
    //     // Save the email locally so you don't need to ask the user for it again
    //     // if they open the link on the same device.
    //     window.localStorage.setItem("emailForSignIn", email)
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code
    //     const errorMessage = error.message
    //     // ...
    //   })
  }

  if (isLoading) {
    return <LoadingModal />
  }

  return (
    <Screen style={ROOT} preset="fixed" testID="LoginScreen">
      <View centerH spread flex-1 width={widthPercentageToDP("70%")}>
        <View flex-1 centerV>
          <AppLogo width={widthPercentageToDP("95%")} height={widthPercentageToDP("95%") / 5} />
        </View>
        <View flex-2 center width="100%">
          <Text color={ThemeManager.titleColor} text60BO center>
            {"Create an account to save bookmarks & preferences"}
          </Text>

          <View width={"100%"} spread marginV-s4>
            <GoogleSignInButton {...{ setIsLoading, onError }} />
            <FacebookSignInButton {...{ setIsLoading, onError }} />
            <AppleSignInButton {...{ setIsLoading, onError }} />
          </View>

          <View style={SPACER} marginV-s4 height-0 />

          <GuestSignInButton />
        </View>

        <View marginV-s6>
          <Button
            label="Trouble signing in?"
            text80BO
            link
            marginB-s3
            labelStyle={LABEL}
            onPress={handleTroubleLoggingIn}
          />
        </View>
      </View>
      <MeshBackground />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: spacing[3],
}
const SPACER: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: ThemeManager.titleColor,
  opacity: 0.5,
  borderWidth: 1,
  width: 50,
}
const LABEL: TextStyle = {
  textDecorationLine: "underline",
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
