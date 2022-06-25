import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"
import { color, spacing } from "theme"

export interface GuestSignInButtonProps {}

/**
 * Button for authenticating with Firestore anonymously
 */
export const GuestSignInButton = observer(function GuestSignInButton(
  _props: GuestSignInButtonProps,
) {
  const onPress = () => {
    auth().signInAnonymously().catch(Sentry.captureException)
  }

  return (
    <Button
      style={BUTTON}
      linkColor="white"
      link
      text80BO
      label="Sign in as Guest"
      {...{ onPress }}
    />
  )
})

const BUTTON: ViewStyle = {
  borderWidth: 1,
  paddingHorizontal: spacing[7],
  paddingVertical: spacing[3],
  borderRadius: 8,
  borderColor: color.palette.white,
}
