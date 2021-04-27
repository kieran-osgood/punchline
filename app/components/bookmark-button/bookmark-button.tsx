import * as React from "react"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/AntDesign"
import { color as Color } from "theme"

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
  const { bookmarked, onPress, size = 40 } = props
  const name = bookmarked ? "star" : "staro"
  const color = bookmarked ? Color.success : Color.palette.black

  return <Icon {...{ onPress, name, size, color, accessibilityLabel }} />
})
