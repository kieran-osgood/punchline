/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import BottomSheet from "@gorhom/bottom-sheet"
import { useNavigation, useRoute } from "@react-navigation/native"
import { LoadingJokeCard } from "app/components/joke/joke-card/joke-card"
import Swipeable from "app/components/swipeable/swipeable"
import { JokeModelType, RatingValue, useQuery } from "app/graphql"
import { useStores } from "app/models"
import { NavigationProps } from "app/navigators"
import Skip from "assets/images/skip"
import { AdBanner, BookmarkButton, Ratings, ShareIcons, SwipeHandler } from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Linking, SafeAreaView, StatusBar, ViewStyle } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { Button, Text, View } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { useThrottledCallback } from "use-debounce/lib"
import { CallOptions } from "use-debounce/lib/useDebouncedCallback"

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const [bookmarked, setBookmarked] = React.useState(false)
  const topCard = React.useRef<SwipeHandler>(null)
  const query = useQuery()
  const { apiStore } = useStores()
  const bottomSheetRef = React.useRef<BottomSheet>(null)

  const onSwipe = React.useCallback(
    (joke: JokeModelType, rating: RatingValue, bookmarked: boolean) => {
      joke.rate(joke, rating, bookmarked)
      setBookmarked(false)
    },
    [],
  )

  const handleBookmarkPress = () => setBookmarked((c) => !c)

  const handleSkipPress = () =>
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.SKIP, bookmarked)

  const handleDownVote = () => {
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.BAD, bookmarked)
    topCard.current?.swipeLeft()
  }

  const handleUpVote = () => {
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.GOOD, bookmarked)
    topCard.current?.swipeRight()
  }

  return (
    <>
      <SafeAreaView style={ROOT} testID="JokeScreen">
        <StatusBar barStyle="dark-content" />
        <View style={HEADER}>
          <Button
            label="Press"
            onPress={() => {
              bottomSheetRef.current?.collapse()
            }}
          />
          <Text grey30 bold>
            {apiStore.jokeApi.topOfDeckJoke?.categories?.[0].name}
          </Text>

          <Text text40 bold center marginH-s3 numberOfLines={3}>
            {apiStore.jokeApi.topOfDeckJoke?.title}
          </Text>
        </View>

        <View style={CARDS_CONTAINER}>
          {(query.loading || apiStore.jokeApi.nonViewedJokes.length <= 0) && <LoadingJokeCard />}
          {apiStore.jokeApi.nonViewedJokes.map((joke) => {
            const onTop = joke.id === apiStore.jokeApi.topOfDeckJoke.id
            const ref = onTop ? topCard : null
            return <Swipeable key={joke.id} {...{ onTop, joke, ref, isLoading: query.loading }} />
          })}
        </View>

        <View style={JOKE_INFO}>
          <Ratings
            likes={apiStore.jokeApi.topOfDeckJoke.positiveRating ?? 0}
            dislikes={apiStore.jokeApi.topOfDeckJoke.negativeRating ?? 0}
          />
          <ShareIcons jokeId={apiStore.jokeApi.topOfDeckJoke.id} />
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
      <DeepLinkJokeActionSheet ref={bottomSheetRef} />
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
  height: heightPercentageToDP("15%"),
}

const CARDS_CONTAINER: ViewStyle = {
  height: heightPercentageToDP("45%"),
  marginHorizontal: 16,
  zIndex: 100,
}

const JOKE_INFO: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  paddingHorizontal: PAGE_GUTTERS * 1.35,
  maxHeight: 35,
}

const ACTIVE_OPACITY = 0.4
const config: CallOptions = { trailing: false }
const timeout = 800

type ButtonsProps = {
  handleDownVote: () => void
  handleUpVote: () => void
  handleBookmarkPress: () => void
  handleSkipPress: () => void
  bookmarked: boolean
}
export const Controls = (props: ButtonsProps) => {
  const { bookmarked, handleBookmarkPress, handleDownVote, handleUpVote, handleSkipPress } = props
  const throttledHandleDownVote = useThrottledCallback(handleDownVote, timeout, config)
  const throttledHandleUpVote = useThrottledCallback(handleUpVote, timeout, config)
  const throttledHandleSkipPress = useThrottledCallback(handleSkipPress, timeout, config)

  return (
    <View style={BUTTONS}>
      <Button
        style={[ACTION_BUTTON, { padding: spacing[4] }]}
        iconStyle={{ padding: spacing[4] }}
        round
        onPress={throttledHandleDownVote}
        activeOpacity={ACTIVE_OPACITY}
        iconSource={() => <CryingEmoji scale={1.1} />}
      />

      <View style={SECONDARY_ACTION_BUTTONS}>
        <Button
          style={ACTION_BUTTON}
          round
          onPress={handleBookmarkPress}
          activeOpacity={ACTIVE_OPACITY}
          iconSource={() => <BookmarkButton bookmarked={bookmarked} size={24} />}
          marginB-s2
        />
        <Button
          style={ACTION_BUTTON}
          round
          onPress={throttledHandleSkipPress}
          activeOpacity={ACTIVE_OPACITY}
          iconSource={() => <Skip />}
        />
      </View>

      <Button
        style={ACTION_BUTTON}
        round
        onPress={throttledHandleUpVote}
        activeOpacity={ACTIVE_OPACITY}
        iconSource={() => <LaughingEmoji scale={1.4} />}
      />
    </View>
  )
}

const BUTTONS: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  height: "20%",
  width: "70%",
  paddingVertical: 10,
  alignSelf: "center",
  alignItems: "center",
}
const SECONDARY_ACTION_BUTTONS: ViewStyle = {
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
}
export const ACTION_BUTTON: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "hsl(0, 0%, 99%)",
  borderRadius: 75,
  shadowColor: "grey",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  position: "relative",
  alignItems: "center",
  padding: 5,
}
const NoRefDeepLinkJokeActionSheet = (props: unknown, ref: React.Ref<BottomSheet>) => {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  console.log("route: ", route)
  const jokeId = route.params?.id
  console.log("jokeId: ", jokeId)
  const [index, setIndex] = React.useState(-1)
  const { apiStore } = useStores()
  const navigation = useNavigation<NavigationProps<"JokeScreen">["navigation"]>()

  /* Temporary fix due to issues with linking:
    - https://github.com/facebook/react-native/issues/25675
    - https://github.com/facebook/react-native/pull/32123
  */
  const extractDeepLinkId = (url: string): string => url.replace("punchline://joke/", "")
  const handleDeepLink = React.useCallback(
    (url) => {
      if (url) {
        if (extractDeepLinkId(url) !== route.params?.id) {
          navigation.setParams({
            id: extractDeepLinkId(url),
          })
        }
      }
    },
    [navigation, route.params?.id],
  )

  React.useEffect(() => {
    Linking.addEventListener("url", (e) => {
      if (e.url) handleDeepLink(e.url)
    })
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url)
    })
  }, [handleDeepLink, navigation])

  React.useEffect(() => {
    console.log("apiStore.jokeApi.deepLinkJoke: ", apiStore.jokeApi.deepLinkJoke?.id)
    if (apiStore.jokeApi.deepLinkJoke?.viewed) {
      return
    }
    if (jokeId && !apiStore.jokeApi.deepLinkJoke) {
      apiStore.jokeApi.setDeepLinkJoke(jokeId)
    }
    if (
      jokeId &&
      !apiStore.jokeApi.deepLinkJoke?.viewed &&
      apiStore.jokeApi.deepLinkJoke?.id === jokeId
    ) {
      console.log("3")
      setIndex(0)
    }
  }, [apiStore.api.jokes, apiStore.jokeApi, jokeId])

  const snapPoints = React.useMemo(() => ["100%"], [])

  const onChange = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <BottomSheet {...{ ref, onChange, snapPoints, index }} enablePanDownToClose>
      <View>
        <Text>Awesome 🎉</Text>
        <Button
          label={apiStore.jokeApi.deepLinkJoke?.title}
          onPress={() => apiStore.jokeApi.deepLinkJoke?.markViewed()}
        />
      </View>
    </BottomSheet>
  )
}

const DeepLinkJokeActionSheet = React.forwardRef(NoRefDeepLinkJokeActionSheet)
