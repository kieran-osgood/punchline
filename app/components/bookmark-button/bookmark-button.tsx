import * as React from "react"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/AntDesign"
import { color } from "theme"

export interface BookmarkButtonProps {
  bookmarked: boolean
  onPress: () => void
}

/**
 * Describe your component here
 */
export const BookmarkButton = observer(function BookmarkButton(props: BookmarkButtonProps) {
  const { bookmarked, onPress } = props

  return (
    <Icon
      name={bookmarked ? "star" : "staro"}
      size={40}
      color={bookmarked ? color.success : color.palette.black}
      onPress={() => onPress()}
    />
  )
})
