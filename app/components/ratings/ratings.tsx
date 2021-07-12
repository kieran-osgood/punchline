import * as React from "react"
import { View, ViewStyle } from "react-native"
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
      <View style={SECTION}>
        <View>
          <Text bold>{String(likes)}</Text>
        </View>
        <View style={LIKE}>
          <LaughingEmoji />
        </View>
      </View>

      <View style={SECTION}>
        <View>
          <Text bold>{String(dislikes)}</Text>
        </View>
        <View style={DISLIKE}>
          <CryingEmoji />
        </View>
      </View>
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
  width: 25,
  paddingLeft: EMOJI_PADDING,
}
const DISLIKE: ViewStyle = {
  width: 19,
  paddingTop: 2,
  paddingLeft: EMOJI_PADDING,
}
