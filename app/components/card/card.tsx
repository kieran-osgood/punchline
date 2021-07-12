import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../"
import { color, spacing } from "theme"

export interface CardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  body: string
  index: number
}

/**
 * Describe your component here
 */
export const Card = observer(function Card(props: CardProps) {
  const { index, style, body } = props

  return (
    <View style={[CONTAINER(index), style]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={TEXT(index)} text={body} bold />
      </View>
    </View>
  )
})

const colors = [
  { background: "hsl(43, 100%, 54%)", text: color.palette.black },
  { background: "hsl(337, 62%, 65%)", text: color.palette.black },
  { background: "hsl(213, 100%, 50%)", text: color.line },
  { background: "hsl(268, 100%, 54%)", text: color.line },
  { background: "hsl(336, 100%, 45%)", text: color.line },
  { background: "hsl(234, 89%, 60%)", text: color.line },
]

const CONTAINER = (index: number): ViewStyle => ({
  justifyContent: "center",
  backgroundColor: colors[index].background,
  padding: spacing[3],
  borderRadius: spacing[3],
  shadowColor: "#000000",
  shadowOffset: {
    width: spacing[1],
    height: spacing[1],
  },
  shadowOpacity: 0.25,
  shadowRadius: spacing[1],
  flex: 1,
  marginTop: spacing[5],
  marginBottom: spacing[2],
})

const TEXT = (index: number): TextStyle => ({
  color: colors[index].text,
  fontSize: 18,
})
