import { Observer, observer } from "mobx-react-lite"
import * as React from "react"
import { Button, ButtonProps, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/AntDesign"
// import { AntDesign } from "@expo/vector-icons"
import Icons from "react-native-vector-icons/FontAwesome"
import Svg, { SvgProps, Path } from "react-native-svg"

export type BookmarkButtonProps = Omit<ButtonProps, "size"> & {
  bookmarked?: boolean
  size?: number
}
export const accessibilityLabel = "Bookmark Button"
/**
 * A star icon component that highlights on press to indicate we wish to bookmark the joke.
 */
export const BookmarkButton = function BookmarkButton(props: BookmarkButtonProps) {
  const { bookmarked = false, size = 34, ...rest } = props
  const name = bookmarked ? "star" : "staro"
  const color = bookmarked ? "rgb(255, 193, 7)" : "#000000"

  return (
    <Button
      {...rest}
      testID="bookmarks-button"
      accessibilityLabel={accessibilityLabel}
      iconSource={() => (
        <Observer>{() => <Star {...{ filled: bookmarked, size, color }} />}</Observer>
      )}
      round
      marginB-s2
    />
  )
}

const Star = (props: SvgProps & { filled: boolean; size: number; color: string }) => {
  return (
    <Svg viewBox="0 0 576 512" width={props.size} height={props.size}>
      {props.filled ? (
        <Path
          fill={props.color}
          d="M259.3 17.8 194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        />
      ) : (
        <Path
          fill={props.color}
          d="M528.1 171.5 382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
        />
      )}
    </Svg>
  )
}
