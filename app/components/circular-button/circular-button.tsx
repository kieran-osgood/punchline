import * as React from "react"
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "hsl(0, 0%, 93%)",
  borderRadius: 75,
  shadowColor: "grey",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  position: "relative",
  alignItems: 'center',
  padding: 5
}
export interface CircularButtonProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  children: React.ReactNode
  onPress: (...args: any[]) => any
  size?: keyof typeof sizes
}

/**
 * Describe your component here
 */
export const CircularButton = observer(function CircularButton(props: CircularButtonProps) {
  const { children, style, size = "default", ...rest } = props

  return (
    <TouchableOpacity style={[CONTAINER, style, {width: sizes[size], height: sizes[size]}]} {...rest}>
      {children}
    </TouchableOpacity>
  )
})

const sizes = {
  small: 45,
  default: 100,
}
