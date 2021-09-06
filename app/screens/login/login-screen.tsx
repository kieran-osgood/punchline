import auth from "@react-native-firebase/auth"
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
import { Alert, BackHandler, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Button, Text, ThemeManager, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

export const LoginScreen = observer(function LoginScreen() {
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      setIsLoading(false)
      return false
    })

    return () => backHandler.remove()
  }, [])

  const setIsLoading = (val: boolean) => setLoading(val)

  if (isLoading) {
    return <LoadingModal />
  }
  const handleTroubleLoggingIn = () => {
    console.log("print")
    auth().sendSignInLinkToEmail("kieranbosgood@gmail.com", {
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
      dynamicLinkDomain: "app.punch-line.co.uk/login",
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
  return (
    <Screen style={ROOT} preset="fixed" testID="LoginScreen">
      <View centerH spread flex-1 width={widthPercentageToDP("60%")}>
        <View flex-1 centerV>
          <AppLogo
            // color="white"
            width={widthPercentageToDP("80%")}
            height={widthPercentageToDP("80%") / 5}
          />
        </View>

        <View flex-2 center width="100%">
          <Text color={ThemeManager.titleColor} text50BO center>
            {"Create an account to save jokes and preferences"}
          </Text>

          <View width={"100%"} row spread marginV-s6>
            <GoogleSignInButton {...{ setIsLoading, onSuccess, onError }} />
            <FacebookSignInButton {...{ setIsLoading, onSuccess, onError }} />
            <AppleSignInButton {...{ setIsLoading, onSuccess, onError }} />
          </View>

          <Text color={ThemeManager.titleColor} marginV-s6 text70BO>
            {"Or"}
          </Text>

          <GuestSignInButton />
        </View>

        <View marginV-s6>
          <Button
            label="Trouble logging in?"
            text80BO
            link
            marginB-s3
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

const onSuccess = () => {
  Alert.alert(
    "Success",
    "Successfully linked your account, your bookmarks and history has been transferred to this account.",
    [{ text: "Ok" }],
  )
}

const onError = () => {
  Alert.alert(
    "Error",
    "Unable to link acccounts, please reload the app and try again or contact support.",
    [{ text: "Ok" }],
  )
}
