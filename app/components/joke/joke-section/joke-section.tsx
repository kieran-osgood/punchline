/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JokeModelType } from "app/graphql"
import { Controls } from "app/screens"
import { observer } from "mobx-react-lite"
import React from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import Swiper from "react-native-deck-swiper"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Text } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { JokeLength } from "../../../graphql/JokeLengthEnum"
import { jokeModelPrimitives } from "../../../graphql/JokeModel.base"
import { useQuery } from "../../../graphql/reactUtils"
import { nodes } from "../../../graphql/RootStore"
import { CenterView } from "../../center-view/center-view"

const CONTAINER: ViewStyle = {
  width: "95%",
}

const SWIPER: ViewStyle = {
  marginTop: 20,
}

const JOKE_CARD: ViewStyle = {
  borderRadius: 50,
  width: "95%",
  backgroundColor: "white",
  padding: spacing[4],
  borderColor: color.line,
  borderWidth: 1,
  position: "relative",
  flex: 0.5,
}

const EMPTY_JOKE_CARD: ViewStyle = {
  ...JOKE_CARD,
  width: "100%",
  height: "100%",
}

export interface JokeSectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const JokeSection = observer(function JokeSection(props: JokeSectionProps) {
  const [bookmarked, setBookmarked] = React.useState(false)
  const swiper = React.useRef<Swiper<JokeModelType>>(null)
  const { data } = useQuery((store) =>
    store.queryJokes(
      { jokeLength: JokeLength.MEDIUM, blockedCategoryIds: [] },
      nodes(jokeModelPrimitives),
    ),
  )
  if (!data?.jokes) return null
  const { jokes } = data
  return (
    <>
      <CenterView style={CONTAINER}>
        {jokes.nodes.length > 0 ? (
          <Swiper
            ref={swiper}
            cards={jokes.nodes}
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            containerStyle={SWIPER}
            verticalSwipe={false}
            horizontalSwipe={false}
            // @ts-ignore
            disablePanresponder={false}
            showSecondCard
            keyExtractor={(jokeCard) => jokeCard.id}
            renderCard={(jokeCard) => <JokeCard key={jokeCard.id} joke={jokeCard} />}
            backgroundColor={color.background}
            stackSize={3}
          />
        ) : (
          <View style={EMPTY_JOKE_CARD} />
        )}
      </CenterView>

      <Controls
        bookmarked={bookmarked}
        onUpVotePress={() => {
          swiper.current?.swipeRight()
          // fetchNewJoke(true)
        }}
        onDownVotePress={() => {
          swiper.current?.swipeLeft()
          // fetchNewJoke(false)
        }}
        onBookmarkPress={() => setBookmarked(!bookmarked)}
        onSkipPress={() => {
          swiper.current?.swipeTop()
          // fetchNewJoke()
        }}
      />
    </>
  )
})

const JokeCard = ({ joke }: { joke?: JokeModelType }) => {
  const ref = React.useRef<ScrollView>(null)
  if (joke === undefined) return null

  return (
    <View style={JOKE_CARD}>
      <ScrollView
        ref={ref}
        onContentSizeChange={() => ref.current?.flashScrollIndicators()}
        contentContainerStyle={SCROLL_VIEW_STYLE}
        scrollIndicatorInsets={{
          top: spacing[4],
          bottom: spacing[4],
          left: spacing[5],
        }}
      >
        <Text text30 style={JOKE_TITLE}>
          {joke.title}
        </Text>
        <Text style={JOKE_TEXT}>
          {joke.body
            ?.split(/\n/g)
            .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
            .join("\n")}
        </Text>
      </ScrollView>
    </View>
  )
}

const SCROLL_VIEW_STYLE: ViewStyle = {
  alignItems: "center",
  marginTop: spacing[2],
  justifyContent: "space-between",
  minHeight: "84%",
  paddingBottom: hp("5%"),
}
const JOKE_TITLE: TextStyle = {
  color: color.storybookDarkBg,
  textAlign: "center",
}
const JOKE_TEXT: TextStyle = {
  marginTop: spacing[3],
  fontSize: 18,
  padding: spacing[2],
  paddingBottom: "5%",
  textAlign: "center",
}
