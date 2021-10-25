import { useNavigation, useRoute } from "@react-navigation/native"
import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import JokeCard from "app/components/joke/joke-card/joke-card"
import { JokeModelType, RatingValue } from "app/graphql"
import { useStores } from "app/models"
import { NavigationProps } from "app/navigators"
import { CARDS_CONTAINER, Controls, JokeTitle } from "app/screens/joke/joke-screen"
import { BottomSheetImperativeHandle } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Linking, StyleSheet, ViewStyle } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { View } from "react-native-ui-lib"

type ForwardDeepLinkJokeSheetProps = {
  close?: () => void
  open?: () => void
}

const extractDeepLinkId = (url: string): string => url.replace("punchline://share/joke/", "")

/**
 * Describe your component here
 */
const ForwardDeepLinkJokeSheet = (
  props: ForwardDeepLinkJokeSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  const [bookmarked, setBookmarked] = React.useState(false)
  const { open, close } = props
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  const { apiStore } = useStores()
  const navigation = useNavigation<NavigationProps<"JokeScreen">["navigation"]>()
  const dummyValue = useSharedValue(0)

  /* Temporary fix due to issues with linking:
    - https://github.com/facebook/react-native/issues/25675
    - https://github.com/facebook/react-native/pull/32123
  */
  const handleDeepLink = React.useCallback(
    async (e: { url: string } | string | null) => {
      const url = typeof e === "object" ? e?.url : e
      if (!url) return

      const id = extractDeepLinkId(url)
      if (id === route.params?.id) return

      navigation.setParams({ id })

      if (id && id !== apiStore.jokeApi.deepLinkJoke?.id) {
        await apiStore.jokeApi.setDeepLinkJoke(id)
      }
    },
    [apiStore.jokeApi, navigation, route.params?.id],
  )

  React.useEffect(() => {
    Linking.getInitialURL().then(handleDeepLink)
    Linking.addEventListener("url", handleDeepLink)
  }, [handleDeepLink, navigation])

  React.useEffect(() => {
    setTimeout(() => {
      if (route.params?.id) {
        handleDeepLink(route.params.id)
        open?.()
      }
    }, 500)
  }, [handleDeepLink, open, route.params?.id])

  const onSwipe = React.useCallback(
    (joke: JokeModelType, rating: RatingValue, bookmarked: boolean) => {
      joke.rate(joke, rating, bookmarked)
      setBookmarked(false)
      close?.()
      navigation.setParams({})
    },
    [close, navigation],
  )

  const handleBookmarkPress = () => setBookmarked((c) => !c)

  const handleSkipPress = () =>
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.SKIP, bookmarked)

  const handleDownVote = () => {
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.BAD, bookmarked)
  }

  const handleUpVote = () => {
    onSwipe(apiStore.jokeApi.topOfDeckJoke, RatingValue.GOOD, bookmarked)
  }
  if (!apiStore.jokeApi.deepLinkJoke) {
    close?.()
    return null
  }

  return (
    <BottomSheetHoc
      ref={ref}
      containerStyle={BOTTOM_SHEET_VIEW}
      initialSnapPoints={["90%"]}
      onClose={() => navigation.setParams({})}
    >
      <JokeTitle />
      <View style={CARDS_CONTAINER}>
        <View style={StyleSheet.absoluteFill}>
          <JokeCard
            joke={apiStore.jokeApi.deepLinkJoke}
            onTop
            translateX={dummyValue}
            translateY={dummyValue}
            scale={dummyValue}
          />
        </View>
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
    </BottomSheetHoc>
  )
}

export const DeepLinkJokeSheet = observer(ForwardDeepLinkJokeSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
}
