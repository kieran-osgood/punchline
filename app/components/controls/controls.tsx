import React from "react"
import { View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/Feather"
import { color, spacing } from "theme"
import { BookmarkButton } from "components"
import { CryingEmoji, LaughingEmoji } from "images"

export interface ControlsProps {
  bookmarked: boolean
  onBookmarkPress: () => void
  onUpVotePress: () => void
  onDownVotePress: () => void
  onSkipPress: () => void
}

/**
 * Describe your component here
 */
export const Controls = observer(function Controls(props: ControlsProps) {
  const { bookmarked, onBookmarkPress, onDownVotePress, onUpVotePress, onSkipPress } = props

  return (
    <View style={BUTTONS_CONTAINER}>
      <TouchableOpacity onPress={() => onDownVotePress()}>
        <CryingEmoji style={{ marginHorizontal: spacing[3] }} />
      </TouchableOpacity>

      <View style={CENTER_BUTTONS}>
        <TouchableOpacity onPress={() => onSkipPress()}>
          <Icon name="skip-forward" size={40} color={color.palette.black} />
        </TouchableOpacity>
        <BookmarkButton bookmarked={bookmarked} onPress={() => onBookmarkPress()} />
      </View>

      <TouchableOpacity onPress={() => onUpVotePress()}>
        <LaughingEmoji style={LAUGHING_EMOJI} />
      </TouchableOpacity>
    </View>
  )
})

const CENTER_BUTTONS: ViewStyle = {
  flexDirection: "column",
  alignContent: "center",
}
const BUTTONS_CONTAINER: ViewStyle = {
  position: "relative",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
}
const LAUGHING_EMOJI: ViewStyle = {
  marginLeft: 0,
}
