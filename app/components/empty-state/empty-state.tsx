import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Button, Text, View } from "react-native-ui-lib"

export interface EmptyStateProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  image?: JSX.Element
  title: string
  body: string | JSX.Element
  ctaText?: string
  onPress: () => void
}

/**
 * Component for displaying in screens that would otherwise display a list of data if data exists
 */
export const EmptyState = observer(function EmptyState(props: EmptyStateProps) {
  const { image, ctaText, title, body, onPress } = props

  return (
    <View>
      {image}
      <Text h1 bold center text40 marginT-s3>
        {title}
      </Text>
      {typeof body === "string" ? (
        <Text center text70 marginT-s2>
          {body}
        </Text>
      ) : (
        <>{body}</>
      )}
      <Button marginT-s5 label={ctaText} {...{ onPress }} />
    </View>
  )
})
