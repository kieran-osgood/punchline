import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { color, spacing } from "theme"
import { Button, Text } from "../"

export interface SubSlideProps {
  /**
   * An optional style override useful for padding & margin.
   */
  subtitle: string
  description: string
  last?: boolean
  onPress: () => void
}

/**
 * Describe your component here
 */
export const SubSlide = observer(function SubSlide(props: SubSlideProps) {
  const { subtitle, description, last, onPress } = props

  return (
    <View style={CONTAINER}>
      <Text h3 style={SUBTITLE}>
        {subtitle}
      </Text>
      <Text style={DESCRIPTION}>{description}</Text>
      <Button
        text={last ? "Let's get started" : "Next"}
        style={last ? {} : BUTTON}
        textStyle={BUTTON_TEXT}
        {...{ onPress }}
      />
    </View>
  )
})

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  padding: 44,
}
const DESCRIPTION: TextStyle = {
  color: "#0C0D34",
  marginBottom: 40,
  textAlign: "center",
}
const SUBTITLE: TextStyle = {
  marginBottom: 12,
  textAlign: "center",
}
const BUTTON_TEXT: TextStyle = {
  color: color.text,
  fontSize: 15,
}
const BUTTON: ViewStyle = {
  backgroundColor: color.line,
  borderRadius: 75,
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[6],
}
