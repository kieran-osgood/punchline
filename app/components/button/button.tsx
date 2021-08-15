import { flatten, mergeAll } from "ramda"
import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { textPresets, viewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    caps,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const content = children || <Text text={caps ? text?.toUpperCase() : text} style={textStyle} />

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
