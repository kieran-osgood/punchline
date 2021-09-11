// https://github.com/react-native-google-signin/google-signin
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin"
import auth from "@react-native-firebase/auth"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
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
  onError?: (error: Error) => void
}
type GoogleSignInError = {
  message: string
  stack: string
  name: string
  code: typeof statusCodes[keyof typeof statusCodes]
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
    return GoogleSignin.signIn()
      .then(({ idToken }) => {
        if (idToken === null) throw Error("idToken null")
        if (isAnonymousConversion) return convertGoogle(idToken)
        return signInWithGoogle(idToken)
      })
      .catch((error: GoogleSignInError) => {
        if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
          onError?.(error)
        }
      })
      .finally(() => setIsLoading?.(false))
  }

  const signInWithGoogle = async (idToken: string) => {
    setIsLoading?.(true)
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    auth()
      .signInWithCredential(googleCredential)
      .then(userStore.login)
      .catch((error: GoogleSignInError) => {
        onError?.(error)
      })
      .finally(() => setIsLoading?.(false))
  }

  const convertGoogle = async (idToken: string) => {
    const credential = auth.GoogleAuthProvider.credential(idToken)
    auth()
      .currentUser?.linkWithCredential(credential)
      .then((e) => {
        userStore.updateUser(e.user)
        onSuccess?.(PROVIDER_NAME)
      })
      .catch((error: GoogleSignInError) => {
        onError?.(error)
      })
      .finally(() => setIsLoading?.(false))
  }

  return (
    <Button
      enableShadow
      style={ICON_BUTTON}
      label="Sign in with Google"
      labelStyle={ICON_BUTTON_LABEL}
      onPress={handlePress}
      iconSource={() => <GoogleIcon scale={1.2} />}
    />
  )
})
