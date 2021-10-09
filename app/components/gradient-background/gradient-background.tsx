import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"

const colors = ["hsl(272, 76%, 43%)", "hsl(260, 100%, 34%)"]
export interface GradientBackgroundProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const GradientBackground = observer(function GradientBackground(
  props: GradientBackgroundProps,
) {
  const { style } = props

  return (
    <View style={[BACKGROUND, style]}>
      <LinearGradient
        colors={colors}
        style={GRADIENT}
        start={{ x: 0.5, y: 0.9 }}
        end={{ x: 0.5, y: 0 }}
        // locations={[0.1, 1]}
      />
    </View>
  )
})

const BACKGROUND: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors[0],
}

const GRADIENT: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  height: "100%",
}
