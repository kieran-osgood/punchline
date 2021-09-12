import auth from "@react-native-firebase/auth"
import { ErrorCallback } from "app/screens"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"
export interface TroubleSigningInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onError: ErrorCallback
}

/**
 * Describe your component here
 */
export const TroubleSigningInButton = observer(function TroubleSigningInButton(
  props: TroubleSigningInButtonProps,
) {
  const handleTroubleLoggingIn = async (email = "kieranbosgood@gmail.com") => {
    try {
      await auth().sendSignInLinkToEmail(email, {
        handleCodeInApp: true,
        url: "http://punchline-f9af3.firebaseapp.com",
        iOS: {
          bundleId: "com.ko.punchline",
        },
        android: {
          packageName: "com.ko.punchline",
          installApp: true,
          minimumVersion: "12",
        },
      })
    } catch (error) {
      if (error instanceof Error) props.onError(error)
    }
  }

  return (
    <Button
      label="Trouble signing in?"
      text80BO
      link
      marginB-s3
      labelStyle={LABEL}
      onPress={() => handleTroubleLoggingIn()}
    />
  )
})

const LABEL: TextStyle = {
  textDecorationLine: "underline",
}
