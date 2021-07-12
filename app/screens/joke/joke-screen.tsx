import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import {
  Screen,
  CenterView,
  Text,
  AdBanner,
  CircularButton,
  ShareIcons,
  Ratings,
  Card,
} from "components"
import { color, spacing } from "theme"
import { CryingEmoji, LaughingEmoji } from "images"
import { useRoute } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"

const jokes = [
  {
    id: "1",
    title: "The Car Joke",
    body: `"Crime in multi-storey car parks. That is wrong on so many different levels"`,
  },

  {
    id: "2",
    title: "The Other Car Joke",
    body: `" That is wrong on so many different levels"`,
  },
]

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  __DEV__ && console.tron.log!(route.params?.jokeId)

  return (
    <Screen style={ROOT} preset="fixed" testID="JokeScreen">
      <CenterView style={CONTAINER}>
        <View style={HEADER}>
          <Text text="Dad Jokes" style={CATEGORY_NAME} bold />
          <Text h2 text="The Car Joke" bold />
        </View>

        <View style={{ position: "relative", flex: 1, width: "100%" }}>
          {jokes.map(({ body }, index) => (
            <View style={[StyleSheet.absoluteFillObject]}>
              <Card key={index} style={CARD} {...{ index, body }} />
            </View>
          ))}
        </View>

        <View style={JOKE_INFO}>
          <Ratings likes={0} dislikes={0} />
          {/* TODO: replace with actual id */}
          <ShareIcons jokeId={route.params?.jokeId ?? ""} />
        </View>

        <Controls />
        <AdBanner />
      </CenterView>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  justifyContent: "space-between",
}

const HEADER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const CARD: ViewStyle = {
  marginHorizontal: PAGE_GUTTERS,
  height: "100%",
  position: "relative",
}

const CATEGORY_NAME: TextStyle = {
  fontSize: 12,
  color: color.dim,
}

const JOKE_INFO: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  paddingHorizontal: PAGE_GUTTERS * 1.35,
  maxHeight: 25,
}

type ButtonsProps = {}
export const Controls = (props: ButtonsProps) => {
  const rate = () => {}
  const bookmark = () => {}
  const skip = () => {}

  return (
    <View style={BUTTONS}>
      <CircularButton style={DISLIKE} onPress={rate}>
        <CryingEmoji />
      </CircularButton>

      <View style={SECONDARY_ACTION_BUTTONS}>
        <CircularButton size="small" onPress={bookmark}>
          <LaughingEmoji />
        </CircularButton>

        <CircularButton size="small" onPress={skip}>
          <LaughingEmoji />
        </CircularButton>
      </View>

      <CircularButton onPress={rate}>
        <LaughingEmoji />
      </CircularButton>
    </View>
  )
}

const BUTTONS: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "80%",
  paddingVertical: 25,
}

const SECONDARY_ACTION_BUTTONS: ViewStyle = {
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}
const DISLIKE: ViewStyle = {
  padding: spacing[4],
}
