import auth from "@react-native-firebase/auth"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button } from "react-native-ui-lib"

export interface GuestSignInButtonProps {}

/**
 * Button for anonymously authenticating with Firestore
 */
export const GuestSignInButton = observer(function GuestSignInButton(
  props: GuestSignInButtonProps,
) {
  const { userStore } = useStores()
  return (
    <Button
      title="Continue as guest"
      type="clear"
      onPress={() => {
        auth()
          .signInAnonymously()
          .then((userCredential) => {
            userStore.login(userCredential)
          })
          .catch((error) => {
            console.error(error)
            // if (error.code === "auth/operation-not-allowed") {
            // crashlytics().log('Enable anonymous in your firebase console.')
            // }
          })
      }}
    />
  )
})
