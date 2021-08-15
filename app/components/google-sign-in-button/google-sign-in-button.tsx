import { GoogleSignin } from "@react-native-community/google-signin"
import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Google as GoogleIcon } from "assets/images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-elements"
import { color, spacing } from "theme"

const PROVIDER_NAME = "Google"

export interface GoogleSignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  setIsLoading?: (val: boolean) => void
  isAnonymousConversion?: boolean
  onSuccess?: (provider: string) => void
  onError?: () => void
}

/**
 * Google Sign in button
 */
export const GoogleSignInButton = observer(function GoogleSigninButton(
  props: GoogleSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props
  const { userStore } = useStores()

  const handlePress = async () => {
    const { idToken } = await GoogleSignin.signIn()
    if (isAnonymousConversion) {
      convertGoogle(idToken)
    } else {
      signInWithGoogle(idToken)
    }
  }

  const signInWithGoogle = async (idToken: string | null) => {
    setIsLoading?.(true)
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const userCredential = await auth().signInWithCredential(googleCredential)
    userStore.login(userCredential)
    setIsLoading?.(false)
  }

  const convertGoogle = (idToken: string | null) => {
    if (idToken === null) onError?.()

    const credential = auth.GoogleAuthProvider.credential(idToken)
    console.log("credential: ", credential)
    auth()
      .currentUser?.linkWithCredential(credential)
      .then((e) => {
        console.log("e: ", e)
        userStore.updateUser(e.user)
        onSuccess?.(PROVIDER_NAME)
      })
      .catch(() => onError?.())
  }

  return (
    <Button
      // title={title}
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<GoogleIcon style={BUTTON_ICON} scale={1.2} />}
      onPress={() => handlePress()}
    />
  )
})

export const BUTTON_ICON: ViewStyle = {}

export const BUTTON_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
  textAlign: "left",
}

export const PILL_BUTTON: ViewStyle = {
  borderRadius: 100,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
}

export const BUTTON_CONTAINER: ViewStyle = {
  borderRadius: 75,
}
