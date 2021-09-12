// https://github.com/thebergamo/react-native-fbsdk-next
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
import { ErrorCallback, ExtractPromiseValue, LoginResponse, SuccessCallback } from "app/screens"
import { Facebook } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { Button } from "react-native-ui-lib"

const PROVIDER_NAME = "Facebook"

export interface FacebookSignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  setIsLoading?: (val: boolean) => void
  isAnonymousConversion?: boolean
  title?: string
  onSuccess?: SuccessCallback
  onError?: ErrorCallback
}

/**
 * Describe your component here
 */
export const FacebookSignInButton = observer(function FacebookSignInButton(
  props: FacebookSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props

  const onFacebookButtonPress = async () => {
    setIsLoading?.(true)
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
      if (result.isCancelled) {
        return
      }
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        setIsLoading?.(false)
        throw Error("Facebook Sign-In failed - AccessToken empty")
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

      const user: ExtractPromiseValue<LoginResponse> = isAnonymousConversion
        ? await convertFacebook(facebookCredential)
        : await signInWithFacebook(facebookCredential)

      if (!user) throw Error("onFacebookButtonPress - Sign in failed - user null")

      onSuccess?.(PROVIDER_NAME, user)
    } catch (error) {
      if (error instanceof Error) onError?.(error)
    } finally {
      setIsLoading?.(false)
    }
  }

  const signInWithFacebook = async (
    facebookCredential: FirebaseAuthTypes.AuthCredential,
  ): LoginResponse => {
    const response = await auth().signInWithCredential(facebookCredential)
    return response.user
  }

  const convertFacebook = async (credential: FirebaseAuthTypes.AuthCredential): LoginResponse => {
    const response = await auth().currentUser?.linkWithCredential(credential)
    return response?.user ?? null
  }

  return (
    <Button
      style={ICON_BUTTON}
      iconSource={() => <Facebook />}
      onPress={onFacebookButtonPress}
      enableShadow
      label="Sign in with Facebook"
      labelStyle={ICON_BUTTON_LABEL}
    />
  )
})
