import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, CenterView, Text, AdBanner, CircularButton, ShareIcons, Ratings } from "components"
import { color } from "theme"
import { CryingEmoji, LaughingEmoji } from "images"
import { useRoute } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  __DEV__ && console.tron.log!(route.params?.jokeId)

  return (
    <Screen style={ROOT} preset="fixed" testID="JokeScreen">
      <CenterView style={{ justifyContent: "flex-end" }}>
        <View style={HEADER}>
          <Text text="Dad Jokes" />
          <Text h1 text="The Car Joke" />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ flexWrap: "wrap", flex: 1 }}
            text={`"Crime in multi-storey car parks. That is wrong on so many different levels.`}
          />
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

const JOKE_INFO: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  paddingHorizontal: PAGE_GUTTERS,
  maxHeight: 25,
}

const HEADER: ViewStyle = {
  alignItems: "center",
  flex: 0.3,
  justifyContent: "center",
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
  width: 50,
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}
const DISLIKE: ViewStyle = {
  padding: 15,
}
