import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"

const colors = ["hsl(272, 76%, 43%)", "hsl(260, 100%, 34%)"]

type Layouts = Record<
  NonNullable<GradientBackgroundProps["layout"]>,
  {
    start: LinearGradientProps["start"]
    end: LinearGradientProps["end"]
  }
>

const layouts: Layouts = {
  "top-down": {
    start: { x: 0.55, y: 0.9 },
    end: { x: 0.5, y: 0 },
  },
  "topleft-to-bottomright": {
    start: { x: 0.15, y: 1 },
    end: { x: 0.85, y: 0 },
  },
} as const

export interface GradientBackgroundProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]
  absolute?: boolean
  layout?: "top-down" | "topleft-to-bottomright"
}

/**
 * Describe your component here
 */
export const GradientBackground = observer(function GradientBackground(
  props: GradientBackgroundProps,
) {
  const { style, absolute, layout = "top-down" as const } = props

  return (
    <View style={[BACKGROUND, absolute ? StyleSheet.absoluteFillObject : {}, style]}>
      <LinearGradient
        colors={colors}
        style={GRADIENT}
        start={layouts[layout].start}
        end={layouts[layout].end}
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
