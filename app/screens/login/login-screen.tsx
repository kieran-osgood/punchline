import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, BackHandler, TextStyle, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "theme"
import { LoadingModal, AppLogo, CenterView, Screen, Text, GoogleSigninButton, GuestSigninButton } from "components"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: spacing[3]
}

const APP_LOGO: ViewStyle = {
  paddingTop: spacing[3],
}

const COPY: TextStyle = {
  width: widthPercentageToDP("70"),
  textAlign: "center",
}
export const PILL_BUTTON: ViewStyle = {
  borderRadius: 100,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
}

export const BUTTON_CONTAINER: ViewStyle = {
  width: 305,
  marginVertical: spacing[3],
}

const TEXT_SEPERATOR: TextStyle = {
  fontSize: 15,
  marginVertical: spacing[5],
}

const COPYRIGHT_TEXT: TextStyle = {
  paddingBottom: spacing[3],
  textAlign: 'center',
}

const TEXT_CENTER: TextStyle = {
  textAlign: 'center',
}

const BUTTONS_CONTAINER: ViewStyle = {
  flex: 0,
}

export const LoginScreen = observer(function LoginScreen() {
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
    <Screen style={ROOT} preset='fixed' testID="LoginScreen">
      <AppLogo style={APP_LOGO} />

      <Text h1 text="Login" style={TEXT_CENTER} />
      <Text
        style={COPY}
        text="Login to bookmark your favourite jokes for later, and view your history!"
      />
      <CenterView style={BUTTONS_CONTAINER}>
        <GoogleSigninButton
          setIsLoading={(val) => setIsLoading(val)}
          onSuccess={successPopup}
          onError={errorPopup}
        />
        {/* <FacebookSignIn setIsLoading={(val) => setIsLoading(val)}
            onSuccess={successPopup}
            onError={errorPopup}
          /> */}
        <Text style={TEXT_SEPERATOR} text="Or" />
        <GuestSigninButton />
      </CenterView>
      <Text text={`COPYRIGHT \u00A9 ${new Date().getFullYear()} KO.DEV`} style={COPYRIGHT_TEXT} />
    </Screen>
  )
})

const successPopup = () => {
  Alert.alert(
    "Success",
    "Successfully linked your account, your bookmarks and history has been transferred to this account.",
    [{ text: "Ok" }],
  )
}

const errorPopup = () => {
  Alert.alert(
    "Error",
    "Unable to link acccounts, please reload the app and try again or contact support.",
    [{ text: "Ok" }],
  )
}
