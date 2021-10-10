import { GradientBackground } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Text, TouchableOpacity } from "react-native-ui-lib"

const CONTAINER: ViewStyle = {
  overflow: "hidden",
}

export interface GradientButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onPress?: () => void
  label: string
}

/**
 * Describe your component here
 */
export const GradientButton = observer(function GradientButton(props: GradientButtonProps) {
  const { style, onPress, label } = props

  return (
    <TouchableOpacity
      style={[CONTAINER, style]}
      paddingV-s3
      paddingH-s8
      br10
      activeOpacity={0.7}
      {...{ onPress }}
    >
      <GradientBackground absolute />
      <Text white text70BO>
        {label}
      </Text>
    </TouchableOpacity>
  )
})
