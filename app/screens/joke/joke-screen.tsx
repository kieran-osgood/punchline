/* eslint-disable @typescript-eslint/no-empty-function */
import { useRoute } from "@react-navigation/native"
import Swipeable from "app/components/swipeable/swipeable"
import { JokeModelType, RatingValue, useQuery } from "app/graphql"
import { NavigationProps } from "app/navigators/main-navigator"
import Skip from "assets/images/skip"
import {
  AdBanner,
  BookmarkButton,
  CircularButton,
  JokeModel,
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
const Jokes: JokeModel[] = [
  {
    id: 1,
    // title: "The Car Joke",
    body: `Crime in multi-storey car parks. That is wrong on so many different levels`,
  },

  {
    id: 2,
    // title: "The Other Car Joke",
    body: `That is wrong on so many different levels`,
  },
]

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen(props) {
  const [bookmarked, setBookmarked] = React.useState(false)
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  const topCard = React.useRef<SwipeHandler>(null)
  const scale = useSharedValue(0)
  const { store } = useQuery()
  console.tron.log({ store: store.nonViewedJokes })

  React.useEffect(() => {
    store.fetchMoreJokes()
  }, [])

  const onSwipe = React.useCallback(
    (joke: JokeModelType, rating: RatingValue, bookmarked: boolean) => {
      joke.rate(joke, rating, bookmarked)
      setBookmarked(false)
    },
    [],
  )

  const handleBookmarkPress = () => {
    setBookmarked((c) => !c)
  }
  const handleSkipPress = () => {
    onSwipe(store.topOfDeckJoke, RatingValue.SKIP, bookmarked)
  }

  const handleDownVote = () => {
    onSwipe(store.topOfDeckJoke, RatingValue.BAD, bookmarked)
    topCard.current?.swipeLeft()
  }

  const handleUpVote = () => {
    onSwipe(store.topOfDeckJoke, RatingValue.GOOD, bookmarked)
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
          {store.nonViewedJokes.map((joke) => {
            const onTop = joke.id === store.topOfDeckJoke.id
            // console.tron.log("onTop: ", onTop)
            const ref = onTop ? topCard : null
            return <Swipeable ref={ref} key={joke.id} joke={joke} scale={scale} onTop={onTop} />
          })}
        </View>

        <View style={JOKE_INFO}>
          <Ratings likes={0} dislikes={0} />
          <ShareIcons jokeId={route.params?.jokeId ?? ""} />
        </View>

        <Controls
          {...{
            bookmarked,
            handleDownVote,
            handleUpVote,
            handleSkipPress,
            handleBookmarkPress,
          }}
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
}

const HEADER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing[6],
}

const CARDS_CONTAINER: ViewStyle = {
  flex: 1,
  marginHorizontal: 16,
  zIndex: 100,
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
