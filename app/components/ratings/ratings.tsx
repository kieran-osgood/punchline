import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Text, View, ViewProps } from "react-native-ui-lib"

export interface RatingsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  likes: number | undefined
  dislikes: number | undefined
}

/**
 * Describe your component here
 */
export const Ratings = observer(function Ratings(props: RatingsProps) {
  const { likes, dislikes, style } = props

  return (
    <View {...{ style }} row>
      <Rating rating={likes} accessibilityLabel="Positive Reviews">
        <LaughingEmoji scale={0.65} />
      </Rating>
      <Rating rating={dislikes} accessibilityLabel="Negative Reviews">
        <CryingEmoji scale={0.48} />
      </Rating>
    </View>
  )
})

type RatingProps = { rating: number | undefined; children: React.ReactNode } & ViewProps
const Rating = ({ rating, children, ...rest }: RatingProps) => {
  return (
    <View center row marginR-s3 width-20 {...rest}>
      <Text text60BO>{String(rating ?? 0)}</Text>
      <View center marginL-s2>
        {children}
      </View>
    </View>
  )
}
