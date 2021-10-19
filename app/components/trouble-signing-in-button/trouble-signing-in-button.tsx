import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"
export interface TroubleSigningInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onPress?: () => void
}

/**
 * Describe your component here
 */
export const TroubleSigningInButton = observer(function TroubleSigningInButton(
  props: TroubleSigningInButtonProps,
) {
  return (
    <Button
      label="Trouble signing in?"
      text80BO
      link
      paddingB-s5
      paddingT-s3
      linkColor="white"
      labelStyle={LABEL}
      onPress={props.onPress}
    />
  )
})

const LABEL: TextStyle = {
  textDecorationLine: "underline",
}
