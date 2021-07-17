import { useRoute } from "@react-navigation/native"
import { NavigationProps } from "app/navigators/main-navigator"
import Skip from "assets/images/skip"
import {
  AdBanner,
  BookmarkButton,
  Card,
  CircularButton,
  Ratings,
  Screen,
  ShareIcons,
  Text,
} from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { color, spacing } from "theme"
import { JokeLength } from "../../graphql/JokeLengthEnum"
import { jokeModelPrimitives } from "../../graphql/JokeModel.base"
import { useQuery } from "../../graphql/reactUtils"
import { nodes } from "../../graphql/RootStore"

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
  const [cards, setCards] = React.useState(jokes)

  const { data } = useQuery((store) =>
    store.queryJokes(
      { blockedCategoryIds: store.blockedCategoryIds, jokeLength: JokeLength.MEDIUM },
      nodes(jokeModelPrimitives),
    ),
  )

  const handleBad = () => {
    translateX.value = withTiming(width * 1.2)
    translateY.value = withTiming(150)
    rotate.value = withSpring(1)
  }

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotate = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: -translateY.value },
      { rotateZ: `${rotate.value}deg` },
    ],
  }))

  return (
    <Screen style={ROOT} preset="fixed" testID="JokeScreen" unsafe>
      <View style={HEADER}>
        <Text text="Dad Jokes" style={CATEGORY_NAME} bold />
        <Text h2 text="The Car Joke" bold />
      </View>

      <View style={{ position: "relative", flex: 1, width: "100%" }}>
        {cards.map(({ id, body }, index) => (
          <Card key={id} style={CARD} animatedStyles={animatedStyles} {...{ index, body }} />
        ))}
      </View>

      <View style={JOKE_INFO}>
        <Ratings likes={0} dislikes={0} />
        <ShareIcons jokeId={route.params?.jokeId ?? ""} />
      </View>

      <Controls onBad={handleBad} />
      <AdBanner />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
}

const HEADER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing[6],
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
      <CircularButton style={DISLIKE} onPress={rate} activeOpacity={0.8}>
        <CryingEmoji />
      </CircularButton>

      <View style={SECONDARY_ACTION_BUTTONS}>
        <CircularButton size="small" onPress={skip} activeOpacity={0.8}>
          <BookmarkButton />
        </CircularButton>

        <CircularButton size="small" onPress={bookmark} activeOpacity={0.8}>
          <Skip />
        </CircularButton>
      </View>

      <CircularButton onPress={rate} activeOpacity={0.8}>
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
