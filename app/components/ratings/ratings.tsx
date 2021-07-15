import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../"
import { LaughingEmoji, CryingEmoji } from "images"

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
    <View style={[CONTAINER, style]}>
      <Rating rating={likes}>
        <LaughingEmoji style={LIKE} />
      </Rating>
      <Rating rating={dislikes}>
        <CryingEmoji style={DISLIKE} scale={0.35} />
      </Rating>
    </View>
  )
})

const EMOJI_PADDING = 4
const CONTAINER: ViewStyle = {
  flexDirection: "row",
}
const SECTION: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 8,
}
const LIKE: ViewStyle = {
  width: 20,
  paddingLeft: EMOJI_PADDING,
  height: "100%",
}
const DISLIKE: ViewStyle = {
  marginLeft: EMOJI_PADDING,
}
const TEXT: TextStyle = {
  fontSize: 18,
}

const Rating = ({ rating, children }: { rating: number; children: React.ReactNode }) => {
  return (
    <View style={SECTION}>
      <View>
        <Text bold style={TEXT}>
          {String(rating)}
        </Text>
      </View>
      <View style={RATING}>{children}</View>
    </View>
  )
}

const RATING: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
