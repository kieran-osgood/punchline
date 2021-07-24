import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Facebook } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button, ViewStyle } from "react-native"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { BUTTON_CONTAINER, BUTTON_ICON, BUTTON_TITLE, PILL_BUTTON } from ".."

export interface FacebookSignInButtonProps {
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
 * Describe your component here
 */
export const FacebookSignInButton = observer(function FacebookSignInButton(
  props: FacebookSignInButtonProps,
) {
  const {
    style,
    title = "Log in with Facebook",
    isAnonymousConversion = false,
    setIsLoading,
  } = props

  const { userStore } = useStores()

  async function onFacebookButtonPress() {
    if (setIsLoading) setIsLoading(true)
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
    auth()
      .currentUser?.linkWithCredential(credential)
      .then(function () {
        // successPopup()
      })
      .catch(function () {
        if (setIsLoading) setIsLoading(false)
        // errorPopup()
        // crashlytics().log(`Error upgrading anonymous account ${error}`)
      })
  }

  return (
    <Button
      title={title}
      buttonStyle={[PILL_BUTTON, style]}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<Facebook style={BUTTON_ICON} />}
      onPress={() => onFacebookButtonPress()}
    />
  )
})
