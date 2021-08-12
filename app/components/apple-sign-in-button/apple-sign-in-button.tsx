// import { GoogleSignin } from "@react-native-community/google-signin"
import { useStores } from "app/models"
import { Apple } from "assets/images/apple"
import { BUTTON_ICON } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-elements"
import { color, spacing } from "theme"

export interface AppleSignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  setIsLoading?: (val: boolean) => void
  isAnonymousConversion?: boolean
  title?: string
  onSuccess?: () => void
  onError?: () => void
}

/**
 * Google Sign in button
 */
export const AppleSignInButton = observer(function AppleSigninButton(
  props: AppleSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props
  const { userStore } = useStores()

  const handlePress = async () => {
    // const { idToken } = await GoogleSignin.signIn()
    // if (isAnonymousConversion) {
    //   convertGoogle(idToken)
    // } else {
    //   signInWithGoogle(idToken)
    // }
  }

  // const signInWithGoogle = async (idToken: string | null) => {
  //   setIsLoading?.(true)
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  //   const userCredential = await auth().signInWithCredential(googleCredential)
  //   userStore.login(userCredential)
  //   setIsLoading?.(false)
  // }

  // const convertGoogle = (idToken: string | null) => {
  //   if (idToken === null) onError?.()

  //   const credential = auth.GoogleAuthProvider.credential(idToken)
  //   auth()
  //     .currentUser?.linkWithCredential(credential)
  //     .then((e) => {
  //       userStore.updateUser(e.user)
  //       onSuccess?.()
  //     })
  //     .catch(() => onError?.())
  // }

  return (
    <Button
      // title={title}
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<Apple style={BUTTON_ICON} scale={0.01} />}
      onPress={() => handlePress()}
    />
  )
})

const BUTTON_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: color.text,
  textAlign: "left",
}

const PILL_BUTTON: ViewStyle = {
  borderRadius: 100,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
}

const BUTTON_CONTAINER: ViewStyle = {
  borderRadius: 75,
}
