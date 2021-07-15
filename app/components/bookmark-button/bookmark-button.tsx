import * as React from "react"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/AntDesign"
import { color as Color } from "theme"
import { IconProps } from "react-native-vector-icons/Icon"

export interface BookmarkButtonProps {
  bookmarked: boolean
  onPress: () => void
  size?: number
}
export const accessibilityLabel = "Bookmark Button"
/**
 * A star icon component that highlights on press to indicate we wish to bookmark the joke.
 */
export const BookmarkButton = observer(function BookmarkButton(props: BookmarkButtonProps) {
  const { bookmarked = true, onPress, size = 34 } = props
  const name = bookmarked ? "star" : "staro"
  const color = bookmarked ? Color.success : "#000000"

  return <Icon {...{ onPress, name, size, color, accessibilityLabel }} style={STAR} />
})

const STAR: IconProps["style"] = {
  shadowRadius: 4,
  shadowColor: Color.success,
  shadowOpacity: 0.25,
}
