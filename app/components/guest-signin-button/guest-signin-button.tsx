import * as React from "react"
import auth from "@react-native-firebase/auth"
import { Button } from 'react-native-elements'
import { observer } from "mobx-react-lite"
import { useStores } from 'app/models'

export interface GuestSigninButtonProps {}

/**
 * Button for anonymously authenticating with Firestore
 */
export const GuestSigninButton = observer(function GuestSigninButton(props: GuestSigninButtonProps) {
  const { userStore } = useStores()

  return (
    <Button
      title="Continue as guest"
      type="clear"
      onPress={() => {
        auth()
          .signInAnonymously()
          .then((userCredential) => {
            userStore.updateUser(userCredential.user)
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
