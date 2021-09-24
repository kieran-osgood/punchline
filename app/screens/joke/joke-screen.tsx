/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useRoute } from "@react-navigation/native"
import Swipeable from "app/components/swipeable/swipeable"
import { JokeModelType, RatingValue, useQuery } from "app/graphql"
import { NavigationProps } from "app/navigators/main-navigator"
import Skip from "assets/images/skip"
import { AdBanner, BookmarkButton, Ratings, ShareIcons, SwipeHandler } from "components"
import { CryingEmoji, LaughingEmoji } from "images"
import { observer } from "mobx-react-lite"
import React from "react"
import { SafeAreaView, StatusBar, ViewStyle } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { Button, Text, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

const PAGE_GUTTERS = 15

export const JokeScreen = observer(function JokeScreen() {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  const [bookmarked, setBookmarked] = React.useState(false)
  const topCard = React.useRef<SwipeHandler>(null)
  const query = useQuery()
  const { store } = query
  // React.useEffect(() => {
  // add in logic to pull and set next joke as the top joke
  //   setQuery((store) =>
  //     store.queryJokes(
  //       {
  //         input: {
  //           blockedCategoryIds: store.root.settings.blockedCategoryIds,
  //           jokeLength: store.root.settings.jokeLengthMaxEnum,
  //           deepLinkedJokeId: route.params?.jokeId,
  //           profanityFilter: store.root.settings.profanityFilter,
  //         },
  //       },
  //       (j) =>
  //         j.nodes((n) =>
  //           n.id.body.title.negativeRating.positiveRating.categories((c) => c.id.image.name),
  //         ),
  //       { fetchPolicy: "no-cache" },
  //     ),
  //   )
  // }, [route.params?.jokeId, setQuery])

  const onSwipe = React.useCallback(
    (joke: JokeModelType, rating: RatingValue, bookmarked: boolean) => {
      joke.rate(joke, rating, bookmarked)
      setBookmarked(false)
    },
    [],
  )

  const handleBookmarkPress = () => setBookmarked((c) => !c)

  const handleSkipPress = () => onSwipe(store.topOfDeckJoke, RatingValue.SKIP, bookmarked)

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
        <StatusBar barStyle="dark-content" />
        <View style={HEADER}>
          <Text grey30 bold>
            {store.topOfDeckJoke?.categories?.[0].name}
          </Text>

          <Text text40 bold>
            {store.topOfDeckJoke?.title}
          </Text>
        </View>

        <View style={CARDS_CONTAINER} key={store.deepLinkJokeId}>
          {store.nonViewedJokes.map((joke) => {
            const onTop = joke.id === store.topOfDeckJoke.id
            const ref = onTop ? topCard : null
            return <Swipeable key={joke.id} {...{ onTop, joke, ref, isLoading: query.loading }} />
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
      <Button
        style={[ACTION_BUTTON, { padding: spacing[4] }]}
        iconStyle={{ padding: spacing[4] }}
        round
        onPress={handleDownVote}
        activeOpacity={0.7}
        iconSource={() => <CryingEmoji scale={1.1} />}
      />

      <View style={SECONDARY_ACTION_BUTTONS}>
        <Button
          style={ACTION_BUTTON}
          round
          onPress={handleSkipPress}
          activeOpacity={0.7}
          iconSource={() => <Skip />}
          marginB-s2
        />
        <Button
          style={ACTION_BUTTON}
          round
          onPress={handleBookmarkPress}
          activeOpacity={0.7}
          iconSource={() => <BookmarkButton {...{ bookmarked }} size={24} />}
        />
        {/* <Button
          style={ACTION_BUTTON}
          round
          onPress={() => {
            // Open a modal to take the feedbacks!
          }}
          activeOpacity={0.7}
          iconSource={() => <ErrorReportIcon />}
        /> */}
      </View>

      <Button
        style={ACTION_BUTTON}
        round
        onPress={handleUpVote}
        activeOpacity={0.7}
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
  // height: "100%",
}
export const ACTION_BUTTON: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "hsl(0, 0%, 93%)",
  borderRadius: 75,
  shadowColor: "grey",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  position: "relative",
  alignItems: "center",
  padding: 5,
}

// Build up a shareable link.
// const shareLinkContent: ShareLinkContent = {
//   contentType: "link",
//   contentUrl: "https://facebook.com",
//   contentDescription: "Wow, check out this great site!",
// }

// const handle = async () => {
//   // Share using the share API.
//   ShareDialog.canShow(shareLinkContent)
//     .then((canShare) => {
//
//       if (canShare) {
//         ShareDialog.show(shareLinkContent)
//       }
//     })
//     .then(
//       function (result) {
//
//       },
//       function (error) {
//
//       },
//     )
//     .catch(() => {
//
//     })
// }
