import { useRoute } from "@react-navigation/native"
import Swipeable from "app/components/swipeable/swipeable"
import { JokeModelType, RatingValue, useQuery } from "app/graphql"
import { NavigationProps } from "app/navigators/main-navigator"
import Skip from "assets/images/skip"
import { AdBanner, BookmarkButton, Ratings, ShareIcons, SwipeHandler, Text } from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-lib"
import { color, spacing } from "theme"

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  const { store } = useQuery()
  const [bookmarked, setBookmarked] = React.useState(false)
  const topCard = React.useRef<SwipeHandler>(null)

  React.useEffect(() => {
    /**
     * This mostly works now in that it correctly chooses "Progress" joke as the top card joke
     * but the react mapping isn't changing properly to reflect this
     */
    store.setDeepLinkJoke("Sm9rZQppNg==")
    store.fetchInitialJokes(route.params?.jokeId)
  }, [route.params?.jokeId])

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
          {/* <Text>title: {store.topOfDeckJoke.title}</Text> */}
          <Text
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            text={store.topOfDeckJoke?.categories?.[0].name}
            style={{ ...CATEGORY_NAME, ...CENTER_TEXT }}
            bold
          />
          <Text h2 text={store.topOfDeckJoke.title} bold style={CENTER_TEXT} />
        </View>

        <View style={CARDS_CONTAINER} key={store.deepLinkJokeId}>
          {store.nonViewedJokes.map((joke) => {
            const onTop = joke.id === store.topOfDeckJoke.id
            const ref = onTop ? topCard : null
            return <Swipeable key={joke.id} {...{ onTop, joke, ref }} />
          })}
        </View>

        <View style={JOKE_INFO}>
          <Ratings
            likes={store.topOfDeckJoke.positiveRating ?? 0}
            dislikes={store.topOfDeckJoke.negativeRating ?? 0}
          />
          <ShareIcons jokeId={store.topOfDeckJoke.id} />
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
      <Button style={DISLIKE} round onPress={handleDownVote} activeOpacity={0.7}>
        <CryingEmoji />
      </Button>

      <View style={SECONDARY_ACTION_BUTTONS}>
        <Button size={Button.sizes.small} round onPress={handleBookmarkPress} activeOpacity={0.7}>
          <BookmarkButton {...{ bookmarked }} />
        </Button>

        <Button size={Button.sizes.small} round onPress={handleSkipPress} activeOpacity={0.7}>
          <Skip />
        </Button>
      </View>

      <Button round onPress={handleUpVote} activeOpacity={0.7}>
        <LaughingEmoji />
      </Button>
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
