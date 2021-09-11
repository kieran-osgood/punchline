// https://github.com/thebergamo/react-native-fbsdk-next
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
import { useStores } from "app/models"
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
  onSuccess?: (provider: string) => void
  onError?: (error: Error) => void
}

/**
 * Describe your component here
 */
export const FacebookSignInButton = observer(function FacebookSignInButton(
  props: FacebookSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props
  const { userStore } = useStores()

  const onFacebookButtonPress = async () => {
    setIsLoading?.(true)
    try {
      // Attempt login with permissions
      console.log("Attempt: ")
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
      console.log("result: ", result)
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
      console.log("Create: ")
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
      if (isAnonymousConversion) {
        convertFacebook(data.accessToken)
      } else {
        signInWithFacebook(facebookCredential)
      }
    } catch (error) {
      console.log("error: ", error)
      if (error instanceof Error) onError?.(error)
    } finally {
      setIsLoading?.(false)
    }
  }

  const signInWithFacebook = async (facebookCredential: FirebaseAuthTypes.AuthCredential) => {
    auth()
      .signInWithCredential(facebookCredential)
      .then(userStore.login)
      .catch(onError)
      .finally(() => setIsLoading?.(false))
  }

  const convertFacebook = async (accessToken: string) => {
    const credential = auth.FacebookAuthProvider.credential(accessToken)
    auth()
      .currentUser?.linkWithCredential(credential)
      .then((e) => {
        userStore.updateUser(e.user)
        onSuccess?.(PROVIDER_NAME)
      })
      .catch(onError)
      .finally(() => setIsLoading?.(false))
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
