/* eslint-disable @typescript-eslint/no-empty-function */
import { useRoute } from "@react-navigation/native"
import Swipeable from "app/components/swipeable/swipeable"
import { NavigationProps } from "app/navigators/main-navigator"
import Skip from "assets/images/skip"
import {
  AdBanner,
  BookmarkButton,
  CircularButton,
  Ratings,
  ShareIcons,
  SwipeHandler,
  Text,
} from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { color, spacing } from "theme"

export const defaultProfiles = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require("./assets/1.jpg"),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require("./assets/2.jpg"),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require("./assets/3.jpg"),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require("./assets/4.jpg"),
  },
]
const Jokes = [
  {
    id: 1,
    title: "The Car Joke",
    // body: `"Crime in multi-storey car parks. That is wrong on so many different levels"`,
    body: "https://i.pcmag.com/imagery/reviews/058odIpsFui7XT7sYt0XBFr-9..1569472704.jpg",
  },

  {
    id: 2,
    title: "The Other Car Joke",
    body:
      "https://media.autoexpress.co.uk/image/private/s--vQLHQYNh--/v1597144530/autoexpress/2020/08/Audi%20S3%20revealed-12.jpg",
    // body: `" That is wrong on so many different levels"`,
  },
]

const PAGE_GUTTERS = 15

// const { data } = useQuery((store) =>
//   store.queryJokes(
//     { blockedCategoryIds: userStore.blockedCategoryIds, jokeLength: JokeLength.MEDIUM },
//     nodes(jokeModelPrimitives),
//   ),
// )
export const JokeScreen = () => {
  return <JokeScreenz profiles={defaultProfiles} />
}

const JokeScreenz = observer(function JokeScreen(props: { profiles: typeof defaultProfiles }) {
  const { profiles } = props
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  // const { userStore } = useStores()

  /**
   * 1. Create a map of the current cards
   * 2. have a useRef pointing at the current top card
   * 3. on click we call a method on that ref and increment towards the next ref
   * 4. profit
   */

  const topCard = React.useRef<SwipeHandler>(null)
  const scale = useSharedValue(0)
  const [jokes, setJokes] = React.useState(profiles)
  const onSwipe = React.useCallback(() => {
    setJokes(jokes.slice(0, jokes.length - 1))
  }, [jokes])

  const handleBookmarkPress = () => {}
  const handleSkipPress = () => {}

  const handleDownVote = () => {
    topCard.current?.swipeLeft()
  }
  const handleUpVote = () => {
    topCard.current?.swipeRight()
  }

  return (
    <>
      <SafeAreaView style={ROOT} testID="JokeScreen">
        <View style={HEADER}>
          <Text text="Dad Jokes" style={{ ...CATEGORY_NAME, ...CENTER_TEXT }} bold />

          <Text h2 text="The Car Joke" bold style={CENTER_TEXT} />
        </View>

        <View style={CARDS_CONTAINER}>
          {jokes.map((joke, index) => {
            const onTop = index === jokes.length - 1
            const ref = onTop ? topCard : null
            return (
              <Swipeable
                ref={ref}
                key={joke.id}
                profile={joke}
                scale={scale}
                onSwipe={onSwipe}
                onTop={onTop}
              />
            )
          })}
        </View>

        <View style={JOKE_INFO}>
          <Ratings likes={0} dislikes={0} />
          <ShareIcons jokeId={route.params?.jokeId ?? ""} />
        </View>

        <Controls
          bookmarked={false}
          handleDownVote={handleDownVote}
          handleUpVote={handleUpVote}
          handleSkipPress={handleSkipPress}
          handleBookmarkPress={handleBookmarkPress}
        />
      </SafeAreaView>
      <AdBanner />
    </>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "space-between",
  // alignItems: "center",
}

const HEADER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing[6],
}

const CARDS_CONTAINER: ViewStyle = {
  // position: "relative",
  // flex: 1,
  // width: "100%",
  // zIndex: 100,
  flex: 1,
  marginHorizontal: 16,
  zIndex: 100,
}

const CARD: ViewStyle = {
  marginHorizontal: PAGE_GUTTERS,
  height: "100%",
  position: "relative",
}
const CENTER_TEXT: TextStyle = {
  textAlign: "center",
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
  handleDownVote: () => void
  handleUpVote: () => void
  handleBookmarkPress: () => void
  handleSkipPress: () => void
  bookmarked: boolean
}
export const Controls = (props: ButtonsProps) => {
  const { bookmarked, handleBookmarkPress, handleDownVote, handleUpVote, handleSkipPress } = props
  return (
    <View style={BUTTONS}>
      <CircularButton style={DISLIKE} onPress={handleDownVote} activeOpacity={0.8}>
        <CryingEmoji />
      </CircularButton>

      <View style={SECONDARY_ACTION_BUTTONS}>
        <CircularButton size="small" onPress={handleBookmarkPress} activeOpacity={0.8}>
          <BookmarkButton {...{ bookmarked }} />
        </CircularButton>

        <CircularButton size="small" onPress={handleSkipPress} activeOpacity={0.8}>
          <Skip />
        </CircularButton>
      </View>

      <CircularButton onPress={handleUpVote} activeOpacity={0.8}>
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
  alignSelf: "center",
}

const SECONDARY_ACTION_BUTTONS: ViewStyle = {
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}
const DISLIKE: ViewStyle = {
  padding: spacing[4],
}
