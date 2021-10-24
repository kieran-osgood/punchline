/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { DeepLinkJokeSheet } from "app/components/deep-link-joke-sheet/deep-link-joke-sheet"
import { JokeOptionsSheet } from "app/components/joke-options-sheet/joke-options-sheet"
import { LoadingJokeCard } from "app/components/joke/joke-card/joke-card"
import { ReportJokeSheet } from "app/components/report-joke-sheet/report-joke-sheet"
import Swipeable from "app/components/swipeable/swipeable"
import { JokeModelType, RatingValue, useQuery } from "app/graphql"
import useSheetsManager from "app/hooks/use-sheets-manager"
import { useStores } from "app/models"
import { Ellipsis } from "assets/images/ellipsis"
import Skip from "assets/images/skip"
import { AdBanner, BookmarkButton, Ratings, SwipeHandler } from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { SafeAreaView, StatusBar, ViewStyle } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { Button, Text, TouchableOpacity, View } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { useThrottledCallback } from "use-debounce/lib"
import { CallOptions } from "use-debounce/lib/useDebouncedCallback"

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const [bookmarked, setBookmarked] = React.useState(false)
  const topCard = React.useRef<SwipeHandler>(null)
  const query = useQuery()
  const { apiStore } = useStores()
  const { open, close, refs } = useSheetsManager<["jokeOptions", "reportJoke", "deepLinkJoke"]>()

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
          <TouchableOpacity onPress={() => open("jokeOptions")}>
            <Ellipsis />
          </TouchableOpacity>
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

      <JokeOptionsSheet
        ref={(el) => refs.current.set("jokeOptions", el)}
        openReportJoke={() => open("reportJoke")}
        close={() => close()}
      />
      <ReportJokeSheet ref={(el) => refs.current.set("reportJoke", el)} close={() => close()} />
      <DeepLinkJokeSheet
        ref={(el) => refs.current.set("deepLinkJoke", el)}
        open={() => open("deepLinkJoke")}
        close={() => close()}
      />
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
