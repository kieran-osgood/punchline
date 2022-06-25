import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button, ButtonProps } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/AntDesign"

export type BookmarkButtonProps = Omit<ButtonProps, "size"> & {
  bookmarked?: boolean
  size?: number
}
export const accessibilityLabel = "Bookmark Button"
/**
 * A star icon component that highlights on press to indicate we wish to bookmark the joke.
 */
export const BookmarkButton = observer(function BookmarkButton(props: BookmarkButtonProps) {
  const { bookmarked, size = 34, ...rest } = props
  const name = bookmarked ? "star" : "staro"
  const color = bookmarked ? "rgb(255, 193, 7)" : "#000000"

  return (
    <Button
      {...rest}
      testID="bookmarks-button"
      accessibilityLabel={accessibilityLabel}
      iconSource={() => <Icon {...{ name, size, color }} style={STAR} />}
      round
      marginB-s2
    />
  )
})

const STAR = {
  shadowRadius: 4,
  shadowColor: "rgb(255, 193, 7)",
  shadowOpacity: 0.25,
}
