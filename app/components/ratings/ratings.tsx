import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Text, View } from "react-native-ui-lib"

const scale = 0.55
export interface RatingsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  likes: number
  dislikes: number
}

/**
 * Describe your component here
 */
export const Ratings = observer(function Ratings(props: RatingsProps) {
  const { likes, dislikes, style } = props

  return (
    <View {...{ style }} row>
      <Rating rating={likes}>
        <LaughingEmoji {...{ scale }} />
      </Rating>
      <Rating rating={dislikes}>
        <CryingEmoji {...{ scale }} />
      </Rating>
    </View>
  )
})

const Rating = ({ rating, children }: { rating: number; children: React.ReactNode }) => {
  return (
    <View center row marginR-s3 width-20>
      <Text text60BO>{String(rating)}</Text>
      <View center marginL-s2>
        {children}
      </View>
    </View>
  )
}
