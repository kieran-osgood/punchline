// https://github.com/invertase/react-native-apple-authentication
import {
  appleAuth,
  appleAuthAndroid,
  AppleRequestResponse,
} from "@invertase/react-native-apple-authentication"
import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
import { useStores } from "app/models"
import { ErrorCallback, ExtractPromiseValue, LoginResponse, SuccessCallback } from "app/screens"
import { Apple } from "assets/images/apple"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Platform, ViewStyle } from "react-native"
import "react-native-get-random-values"
import { Button } from "react-native-ui-lib"
import { v4 as uuid } from "uuid"

// Use this type for passing around token/nonce - api inconsistency in naming between ios/android
type AppleSignInResponse = Pick<AppleRequestResponse, "identityToken" | "nonce">

const PROVIDER_NAME = "Apple"
type AppleSignInError = {
  message: string
  stack: string
  name: string
  code: typeof appleAuth.Error[keyof typeof appleAuth.Error]
}
export type AppleSignInButtonProps = {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  setIsLoading?: (val: boolean) => void
  title?: string
  isAnonymousConversion?: true
  onSuccess?: SuccessCallback
  onError?: ErrorCallback
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
      let user: ExtractPromiseValue<LoginResponse> = null

      if (Platform.OS === "android") {
        user = isAnonymousConversion
          ? await convertApple(await generateAppleAndroidToken())
          : await signInWithApple(await generateAppleAndroidToken())
      }
      if (Platform.OS === "ios") {
        user = isAnonymousConversion
          ? await convertApple(await generateAppleIOSToken())
          : await signInWithApple(await generateAppleIOSToken())
      }

      if (!user) throw Error("handleAppleSignIn - User was null")

      userStore.updateUser(user)
      onSuccess?.(PROVIDER_NAME, user)
    } catch (error) {
      if (error instanceof Error) onError?.(error)
    } finally {
      setIsLoading?.(false)
    }
  }

  const convertApple = async (appleAuthRequestResponse: AppleSignInResponse): LoginResponse => {
    const { identityToken, nonce } = appleAuthRequestResponse

    const credential = auth.AppleAuthProvider.credential(identityToken, nonce)
    const userCredential = await auth().currentUser?.linkWithCredential(credential)
    return userCredential?.user ?? null
  }

  return (
    <>
      {(Platform.OS === "ios" || appleAuthAndroid.isSupported) && (
        <Button
          style={ICON_BUTTON}
          iconSource={() => <Apple scale={0.01} />}
          onPress={handlePress}
          enableShadow
          label="Sign in with Apple"
          // eslint-disable-next-line react-native/no-inline-styles
          labelStyle={[ICON_BUTTON_LABEL, { paddingLeft: 20 }]}
        />
      )}
    </>
  )
})

/**
 * Note the sign in request can error, e.g. if the user cancels the sign-in.
 * Use `appleAuth.Error` to determine the type of error, e.g. `error.code === appleAuth.Error.CANCELED`
 */
async function signInWithApple(appleAuthRequestResponse: AppleSignInResponse): LoginResponse {
  try {
    // 1). start a apple sign-in request
    const { identityToken, nonce } = appleAuthRequestResponse
    // can be null in some scenarios
    // 3). create a Firebase `AppleAuthProvider` credential
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

    // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
    //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
    //     to link the account to an existing user
    const userCredential = await auth().signInWithCredential(appleCredential)
    return userCredential.user
  } catch (error) {
    const appleError = error as AppleSignInError
    if (appleAuth.Error.CANCELED !== appleError.code) {
      Sentry.captureException(appleError)
    }
    return null
  }
}

const generateAppleIOSToken = async (): Promise<AppleSignInResponse> => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  return appleAuthRequestResponse
}

const generateAppleAndroidToken = async (): Promise<AppleSignInResponse> => {
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
  if (!response.id_token || !response.nonce) {
    throw Error("appleAuthAndroid.signIn - id_token || nonce empty")
  }

  return {
    identityToken: response.id_token,
    nonce: response.nonce,
  }
}
