import { observer } from "mobx-react-lite"
import * as React from "react"
import Icon from "react-native-vector-icons/AntDesign"
import { IconProps } from "react-native-vector-icons/Icon"

export interface BookmarkButtonProps {
  bookmarked: boolean
  size?: number
}
export const accessibilityLabel = "Bookmark Button"
/**
 * A star icon component that highlights on press to indicate we wish to bookmark the joke.
 */
export const BookmarkButton = observer(function BookmarkButton(props: BookmarkButtonProps) {
  const { bookmarked = true, size = 34 } = props
  const name = bookmarked ? "star" : "staro"
  const color = bookmarked ? "rgb(255, 193, 7)" : "#000000"

  return <Icon {...{ name, size, color, accessibilityLabel }} style={STAR} />
})

const STAR: IconProps["style"] = {
  shadowRadius: 4,
  shadowColor: "rgb(255, 193, 7)",
  shadowOpacity: 0.25,
}
