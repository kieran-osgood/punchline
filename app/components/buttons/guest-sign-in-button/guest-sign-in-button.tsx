import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button } from "react-native-ui-lib"

export interface GuestSignInButtonProps {}

/**
 * Button for authenticating with Firestore anonymously
 */
export const GuestSignInButton = observer(function GuestSignInButton(
  _props: GuestSignInButtonProps,
) {
  const { userStore } = useStores()
  const onPress = () => {
    auth().signInAnonymously().then(userStore.login).catch(Sentry.captureException)
  }

  return <Button link text70BO label="Continue as a guest" {...{ onPress }} />
})
