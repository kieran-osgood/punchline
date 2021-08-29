import { UserJokeListProps } from "app/screens/user-profile-tabs/joke-bookmark-history-list"
import { BookmarkButton } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, Text, View } from "react-native-ui-lib"

export interface EmptyStateProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  image?: JSX.Element
  title?: string
  body?: string | JSX.Element
  ctaText?: string
  onPress: () => void
  type?: UserJokeListProps["type"]
}

/**
 * Component for displaying in screens that would otherwise display a list of data if data exists
 */
export const EmptyState = observer(function EmptyState(props: EmptyStateProps) {
  const { type, image, ctaText, title, body, onPress } = props

  return (
    <View>
      {image}
      <Text bold center text40 marginT-s3>
        {type ? EmptyStates[type].title : title}
      </Text>
      {typeof body === "string" ? (
        <Text center text70 marginT-s2>
          {body}
        </Text>
      ) : (
        <Body {...{ type }} />
      )}
      <Button marginT-s5 label={type ? EmptyStates[type].ctaText : ctaText} {...{ onPress }} />
    </View>
  )
})

export const EmptyStates: Record<UserJokeListProps["type"], { title: string; ctaText: string }> = {
  BOOKMARK: {
    title: "No Bookmarks!",
    ctaText: "Go save some jokes!",
  },
  HISTORY: {
    title: "Empty History",
    ctaText: "Explore Jokes!",
  },
}

const Body = ({ type }: { type?: UserJokeListProps["type"] }) => {
  return (
    <>
      {type === "BOOKMARK" && (
        <Text style={BODY} text70 center>
          {"It appears you've not bookmarked any jokes.\n Make sure to press  "}
          <Button
            round
            style={ACTION_BUTTON}
            activeOpacity={0.7}
            iconSource={() => <BookmarkButton bookmarked size={13} />}
            disabled
          />
          {"  to save them here!"}
        </Text>
      )}
      {type === "HISTORY" && (
        <Text>
          {
            "There doesn't seem to be any jokes in your history. Check back after you've rated some jokes!"
          }
        </Text>
      )}
    </>
  )
}
const BODY: TextStyle = {
  lineHeight: 28,
}
const ACTION_BUTTON: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "hsl(0, 0%, 93%)",
  borderRadius: 75,
  shadowColor: "grey",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  position: "relative",
  alignItems: "center",
  padding: 5,
  width: 25,
  height: 25,
}
