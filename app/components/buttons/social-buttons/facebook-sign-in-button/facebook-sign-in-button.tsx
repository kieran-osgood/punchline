import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { ICON_BUTTON } from "app/components/buttons/social-buttons"
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
  onError?: () => void
}

/**
 * Describe your component here
 */
export const FacebookSignInButton = observer(function FacebookSignInButton(
  props: FacebookSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props
  const { userStore } = useStores()

  async function onFacebookButtonPress() {
    setIsLoading?.(true)
    try {
      console.log("await: ")
      // Attempt login with permissions
      await LoginManager.logInWithPermissions(["public_profile", "email"])
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        if (setIsLoading) setIsLoading(false)
        return
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

      if (isAnonymousConversion) {
        convertFacebook(data.accessToken)
      } else {
        signInWithFacebook(facebookCredential)
      }
    } catch (error) {
      onError?.()
    }
  }

  const signInWithFacebook = (facebookCredential: FirebaseAuthTypes.AuthCredential) => {
    auth()
      .signInWithCredential(facebookCredential)
      .then((userCredential) => {
        userStore.login(userCredential)
      })
      // .catch(() => crashlytics().log('Error signin in with facebook'))
      .finally(() => {
        if (setIsLoading) setIsLoading(false)
      })
  }

  const convertFacebook = (accessToken: string | null) => {
    const credential = auth.FacebookAuthProvider.credential(accessToken)
    console.log("credential: ", credential)
    auth()
      .currentUser?.linkWithCredential(credential)
      .then(function () {
        console.log("PROVIDER_NAME: ", PROVIDER_NAME)
        onSuccess?.(PROVIDER_NAME)
      })
      .catch(function () {
        setIsLoading?.(false)
        onError?.()
        // crashlytics().log(`Error upgrading anonymous account ${error}`)
      })
  }

  return (
    <Button
      style={ICON_BUTTON}
      iconSource={() => <Facebook />}
      onPress={() => onFacebookButtonPress()}
      round
    />
  )
})
