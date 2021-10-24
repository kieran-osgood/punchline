import { useNavigation, useRoute } from "@react-navigation/native"
import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { useStores } from "app/models"
import { NavigationProps } from "app/navigators"
import { OptionsBottomSheet } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Linking, ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Button, Text } from "react-native-ui-lib"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardDeepLinkJokeSheetProps = {
  close?: () => void
  open?: () => void
}

/**
 * Describe your component here
 */
const ForwardDeepLinkJokeSheet = (
  props: ForwardDeepLinkJokeSheetProps,
  ref: React.Ref<OptionsBottomSheet>,
) => {
  const route = useRoute<NavigationProps<"JokeScreen">["route"]>()
  const jokeId = route.params?.id
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
      props.open?.()
    }
  }, [apiStore.api.jokes, apiStore.jokeApi, jokeId])

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <Text>Awesome 🎉</Text>
      <Button
        label={apiStore.jokeApi.deepLinkJoke?.title}
        onPress={() => apiStore.jokeApi.deepLinkJoke?.markViewed()}
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
