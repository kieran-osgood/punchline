// https://github.com/invertase/react-native-apple-authentication
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication"
import auth from "@react-native-firebase/auth"
import { ICON_BUTTON, ICON_BUTTON_LABEL } from "app/components/buttons/social-buttons"
import { useStores } from "app/models"
import { Apple } from "assets/images/apple"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Platform, ViewStyle } from "react-native"
import "react-native-get-random-values"
import { Button } from "react-native-ui-lib"

const PROVIDER_NAME = "Apple"
type AppleSignInError = {
  message: string
  stack: string
  name: string
  code: typeof appleAuth.Error[keyof typeof appleAuth.Error]
}
export interface AppleSignInButtonProps {
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
      const user = isAnonymousConversion ? await convertApple() : await signInWithApple()
      if (user) {
        userStore.updateUser(user)
        onSuccess?.(PROVIDER_NAME)
      }
    } catch (error) {
      if (error instanceof Error) onError?.(error)
    } finally {
      setIsLoading?.(false)
    }
  }

  /**
   * Note the sign in request can error, e.g. if the user cancels the sign-in.
   * Use `appleAuth.Error` to determine the type of error, e.g. `error.code === appleAuth.Error.CANCELED`
   */
  async function signInWithApple() {
    try {
      // 1). start a apple sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      // 2). if the request was successful, extract the token and nonce
      const { identityToken, nonce } = appleAuthRequestResponse

      // can be null in some scenarios
      if (identityToken) {
        // 3). create a Firebase `AppleAuthProvider` credential
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

        // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
        //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
        //     to link the account to an existing user
        const userCredential = await auth().signInWithCredential(appleCredential)
        return userCredential.user
      } else {
        // handle this - retry?
        throw Error("IdentityToken is null")
      }
    } catch (error) {
      const appleError = error as AppleSignInError
      if (appleAuth.Error.CANCELED !== appleError.code) {
        onError?.(appleError)
      }
      return null
    }
  }

  const convertApple = async () => {
    // 1). start a apple sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // 2). if the request was successful, extract the token and nonce
    const { identityToken, nonce } = appleAuthRequestResponse

    if (!identityToken) throw Error("Identity Token empty")

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
          labelStyle={ICON_BUTTON_LABEL}
        />
      )}
    </>
  )
})
