// https://github.com/react-native-google-signin/google-signin
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin"
import auth from "@react-native-firebase/auth"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
import { ErrorCallback, LoginResponse, SuccessCallback } from "app/screens"
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
  onSuccess?: SuccessCallback
  onError?: ErrorCallback
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

  const handleGoogleSignInPress = async () => {
    try {
      const response = await GoogleSignin.signIn()
      const { idToken } = response
      if (idToken === null) throw Error("idToken null")
      const user = isAnonymousConversion
        ? await convertGoogle(idToken)
        : await signInWithGoogle(idToken)

      if (!user) throw Error("handleGoogleSignInPress - User was null")

      onSuccess?.(PROVIDER_NAME, user)
    } catch (error) {
      const gError = error as GoogleSignInError
      if (gError.code !== statusCodes.SIGN_IN_CANCELLED) {
        onError?.(gError)
      }
    } finally {
      setIsLoading?.(false)
    }
  }

  const signInWithGoogle = async (idToken: string): LoginResponse => {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const userCredential = await auth().signInWithCredential(googleCredential)
    return userCredential.user
  }

  const convertGoogle = async (idToken: string): LoginResponse => {
    const credential = auth.GoogleAuthProvider.credential(idToken)
    const userCredential = await auth().currentUser?.linkWithCredential(credential)
    return userCredential?.user ?? null
  }

  return (
    <Button
      enableShadow
      style={ICON_BUTTON}
      label="Sign in with Google"
      labelStyle={ICON_BUTTON_LABEL}
      onPress={handleGoogleSignInPress}
      iconSource={() => <GoogleIcon scale={1.2} />}
    />
  )
})
