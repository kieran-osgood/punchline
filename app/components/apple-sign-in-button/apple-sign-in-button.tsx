// import { GoogleSignin } from "@react-native-community/google-signin"
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication"
import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { Apple } from "assets/images/apple"
import { BUTTON_ICON } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-elements"
import "react-native-get-random-values"
import { color, spacing } from "theme"
import { v4 as uuid } from "uuid"

const PROVIDER_NAME = "Apple"

export interface AppleSignInButtonProps {
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
 * Google Sign in button
 */
export const AppleSignInButton = observer(function AppleSigninButton(
  props: AppleSignInButtonProps,
) {
  const { isAnonymousConversion = false, setIsLoading, onSuccess, onError } = props
  const { userStore } = useStores()

  const handlePress = async () => {
    setIsLoading?.(true)
    try {
      if (Platform.OS === "android") {
        isAnonymousConversion
          ? convertApple(await generateAppleIOSToken())
          : await signInWithAppleAndroid()
      }
      if (Platform.OS === "ios") {
        isAnonymousConversion
          ? convertApple(await generateAppleAndroidToken())
          : await signInWithAppleIOS()
      }

      onSuccess?.(PROVIDER_NAME)
    } catch (error) {
      console.log("error: ", error)
      onError?.()
    } finally {
      setIsLoading?.(false)
    }
  }

  const generateAppleIOSToken = async (): Promise<string> => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    if (!appleAuthRequestResponse.identityToken) throw Error()

    return appleAuthRequestResponse.identityToken
  }

  const generateAppleAndroidToken = async (): Promise<string> => {
    const response = await signInWithAppleAndroid()
    if (!response.id_token) throw Error()
    return response.id_token
  }

  async function signInWithAppleAndroid() {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid()
    const state = uuid()

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "com.ko.punchline-android",

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: "https://punchline-f9af3.firebaseapp.com/__/auth/handler",

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    })

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn()
    const { nonce, id_token: identityToken } = response

    if (identityToken) {
      // Create a Firebase credential from the response
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      // Sign the user in with the credential
      const userCredential = await auth().signInWithCredential(appleCredential)
      userStore.login(userCredential)
    }
    return response
    // Send the authorization code to your backend for verification
  }

  /**
   * Note the sign in request can error, e.g. if the user cancels the sign-in.
   * Use `appleAuth.Error` to determine the type of error, e.g. `error.code === appleAuth.Error.CANCELED`
   */
  async function signInWithAppleIOS() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw Error("Apple Sign-In failed - no identify token returned")
    }
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      // Sign the user in with the credential
      const userCredential = await auth().signInWithCredential(appleCredential)
      userStore.login(userCredential)
    }
  }

  const convertApple = (idToken: string | null) => {
    if (idToken === null) onError?.()

    const credential = auth.AppleAuthProvider.credential(idToken)
    auth()
      .currentUser?.linkWithCredential(credential)
      .then((e) => {
        userStore.updateUser(e.user)
        onSuccess?.()
      })
  }

  return (
    <>
      {(Platform.OS === "ios" || appleAuthAndroid.isSupported) && (
        <Button
          // title={title}
          buttonStyle={PILL_BUTTON}
          titleStyle={BUTTON_TITLE}
          containerStyle={BUTTON_CONTAINER}
          raised
          icon={<Apple style={BUTTON_ICON} scale={0.01} />}
          onPress={handlePress}
        />
      )}
    </>
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
