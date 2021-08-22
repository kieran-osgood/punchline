import { GoogleSignin } from "@react-native-community/google-signin"
import auth from "@react-native-firebase/auth"
import { ICON_BUTTON } from "app/components/buttons/social-buttons"
import { useStores } from "app/models"
import { Google as GoogleIcon } from "assets/images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"

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
export const GoogleSignInButton = observer(function GoogleSignInButton(
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
      style={ICON_BUTTON}
      iconSource={() => <GoogleIcon scale={1.6} />}
      onPress={() => handlePress()}
      round
      size={Button.sizes.large}
      enableShadow
    />
  )
})
