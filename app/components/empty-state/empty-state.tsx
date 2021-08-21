import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"
import { Text } from "../"
import { spacing } from "../../theme"

export interface EmptyStateProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  image?: string
  title: string
  body: string
  ctaText?: string
  onPress: () => void
}

/**
 * Component for displaying in screens that would otherwise display a list of data if data exists
 */
export const EmptyState = observer(function EmptyState(props: EmptyStateProps) {
  const { image: uri, ctaText, title, body, style, onPress } = props

  return (
    <View style={[CONTAINER, style]}>
      <Image source={{ uri }} style={IMAGE} />
      <Text h4 bold style={NOTE} text={title} />
      <Text style={NOTE} text={body} />
      <Button label={ctaText} style={CTA} labelStyle={CTA_TEXT} {...{ onPress }} />
    </View>
  )
})

const GAP = spacing[5]

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 0.75,
  paddingHorizontal: spacing[6],
}

const NOTE: TextStyle = {
  marginTop: GAP,
  textAlign: "center",
}

const CTA: ViewStyle = {
  borderRadius: 8,
  paddingHorizontal: spacing[6],
  paddingVertical: spacing[3],
  marginTop: GAP,
}

const CTA_TEXT: TextStyle = {
  fontSize: 16,
}

const IMAGE: ImageStyle = {
  width: 150,
  height: 150,
  marginBottom: spacing[4],
}
