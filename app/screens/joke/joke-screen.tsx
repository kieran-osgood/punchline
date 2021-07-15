import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import {
  Screen,
  CenterView,
  Text,
  AdBanner,
  CircularButton,
  ShareIcons,
  Ratings,
  Card,
  BookmarkButton,
} from "components"
import { color, spacing } from "theme"
import { CryingEmoji, LaughingEmoji } from "images"
import { useRoute } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import Icon from "react-native-vector-icons/Feather"
import Skip from "assets/images/skip"

// import { useQuery } from "../../graphql/reactUtils"
// import { JokeLength } from "../../graphql/JokeLengthEnum"
// import { nodes } from "../../graphql/RootStore"
// import { jokeModelPrimitives } from "../../graphql/JokeModel.base"
// import { JokeModelType } from 'app/graphql'

const { width } = Dimensions.get("screen")

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
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotate = useSharedValue(0)
  // const { data } = useQuery((store) =>
  //   store.queryJokes({ jokeLength: JokeLength.MEDIUM },
  //     nodes(jokeModelPrimitives)
  //   ),
  // )
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: -translateY.value },
      // { rotateZ: `${rotate.value}deg` },
    ],
  }))

  const handleBad = () => {
    translateX.value = withTiming(width * 1.2)
    translateY.value = withTiming(150)
    rotate.value = withSpring(1)
  }

  return (
    <Screen style={ROOT} preset="fixed" testID="JokeScreen">
      <CenterView style={CONTAINER}>
        <View style={HEADER}>
          <Text text="Dad Jokes" style={CATEGORY_NAME} bold />
          <Text h2 text="The Car Joke" bold />
        </View>

        <View style={{ position: "relative", flex: 1, width: "100%" }}>
          {jokes.map(({ id, body }, index) => (
            <Animated.View key={id} style={[StyleSheet.absoluteFillObject, animatedStyles]}>
              <Card style={CARD} {...{ index, body }} />
            </Animated.View>
          ))}
        </View>

        <View style={JOKE_INFO}>
          <Ratings likes={0} dislikes={0} />
          {/* TODO: replace with actual id */}
          <ShareIcons jokeId={route.params?.jokeId ?? ""} />
        </View>

        <Controls onBad={handleBad} />
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

type ButtonsProps = {
  onBad: () => void
}
export const Controls = (props: ButtonsProps) => {
  const rate = () => {
    props.onBad()
  }
  const bookmark = () => {}
  const skip = () => {}

  return (
    <View style={BUTTONS}>
      <CircularButton style={DISLIKE} onPress={rate}>
        <CryingEmoji />
      </CircularButton>

      <View style={SECONDARY_ACTION_BUTTONS}>
        <CircularButton size="small" onPress={skip}>
          <BookmarkButton />
        </CircularButton>

        <CircularButton size="small" onPress={bookmark}>
          <Skip />
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
