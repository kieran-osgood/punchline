import { useNavigation } from "@react-navigation/native"
import { EmptyState } from "app/components/empty-state/empty-state"
import { jokeModelPrimitives, nodes, useQuery } from "app/graphql"
import {
  userJokeHistoryModelPrimitives,
  UserJokeHistoryModelType as UserJokeHistoryType,
} from "app/graphql/UserJokeHistoryModel"
import { NavigationProps } from "app/navigators"
import { BookmarkButton, Button, Screen, Text } from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import Collapsible from "react-native-collapsible"
import { color, spacing } from "theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
}

export const HistoryScreen = observer(function HistoryScreen() {
  const navigation = useNavigation<NavigationProps<"UserProfileScreen">["navigation"]>()
  const { data } = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      {},
      nodes(userJokeHistoryModelPrimitives, `joke{${jokeModelPrimitives.toString()}}`),
    ),
  )

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      {typeof data?.userJokeHistoryByUserId !== "undefined" &&
      data?.userJokeHistoryByUserId.nodes.length > 0 ? (
        <FlatList
          style={FLAT_LIST}
          data={data?.userJokeHistoryByUserId.nodes}
          renderItem={({ index: key, item: userJokeHistory }) => (
            <ListItem {...{ key, userJokeHistory }} />
          )}
          keyExtractor={(userJokeHistory) => String(userJokeHistory.id)}
        />
      ) : (
        <EmptyState
          title="Empty History"
          body="There doesn't seem to be any jokes in your history. Check back after you've rated some jokes!"
          ctaText="Explore Jokes!"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png"
          onPress={() => navigation.navigate("JokeScreen")}
        />
      )}
    </Screen>
  )
})

const COLLAPSIBLE_BUTTON: TextStyle = {
  color: color.text,
}

const ListItem = ({ userJokeHistory }: { userJokeHistory: UserJokeHistoryType }) => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [bookmarked, setBookmarked] = React.useState(userJokeHistory.bookmarked ?? false)

  const onPress = () => {
    setBookmarked(!bookmarked)
    // addToHistory({ joke, rating: joke.rating, bookmark: !bookmarked })
  }

  if (!userJokeHistory.id) return null

  return (
    <View style={LIST_ITEM}>
      <View style={EXPANSION_HEADER}>
        <Button
          text={userJokeHistory.joke.title}
          onPress={() => setCollapsed(!collapsed)}
          style={EXPANSION_BUTTON_CONTAINER}
          // buttonStyle={EXPANSION_BUTTON}
          textStyle={COLLAPSIBLE_BUTTON}
          preset="link"
        />
        <View style={BOOKMARK_BUTTON_CONTAINER}>
          <BookmarkButton {...{ bookmarked, onPress }} />
        </View>
      </View>
      <Collapsible style={COLLAPSIBLE} {...{ collapsed }}>
        <View style={EXPANDED_VIEW}>
          <Text text="" />
          <Text text={userJokeHistory.joke.body} />
        </View>
      </Collapsible>
    </View>
  )
}

const FLAT_LIST: ViewStyle = {
  width: "100%",
}

const LIST_ITEM: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  borderColor: color.dim,
  borderBottomWidth: 0.5,
  display: "flex",
}

const COLLAPSIBLE: ViewStyle = {
  width: "100%",
}

const EXPANDED_VIEW: ViewStyle = {
  width: "100%",
  padding: spacing[3],
  backgroundColor: color.primary,
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "row",
}

const EXPANSION_HEADER: ViewStyle = {
  width: "100%",
  flex: 1,
  flexDirection: "row",
}

const EXPANSION_BUTTON: ViewStyle = {
  justifyContent: "flex-start",
  paddingHorizontal: spacing[3],
  paddingVertical: spacing[5],
}

const EXPANSION_BUTTON_CONTAINER: ViewStyle = {
  width: "80%",
  height: "100%",
}

const BOOKMARK_BUTTON_CONTAINER: ViewStyle = {
  width: "20%",
  borderRadius: 300,
  justifyContent: "center",
  alignItems: "center",
}
