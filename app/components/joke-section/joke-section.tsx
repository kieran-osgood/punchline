/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { observer } from "mobx-react-lite"

import { color, spacing } from "theme"

import { Text } from "../text/text"
import { CenterView } from "../center-view/center-view"
import { Controls } from "../controls/controls"

import Swiper from "react-native-deck-swiper"
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
  const [jokes] = React.useState<Joke[]>([])
  const swiper = React.useRef<Swiper<Joke>>(null)

  return (
    <>
      <CenterView style={{ width: "95%" }}>
        {jokes.length > 0 ? (
          <Swiper
            ref={swiper}
            cards={jokes}
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            containerStyle={{ marginTop: 20 }}
            verticalSwipe={false}
            horizontalSwipe={false}
            // @ts-ignore
            disablePanresponder={false}
            showSecondCard
            keyExtractor={(jokeCard) => jokeCard?.random}
            renderCard={(jokeCard) => <JokeCard key={jokeCard?.random} joke={jokeCard} />}
            backgroundColor={color.background}
            stackSize={3}
          />
        ) : (
          <View style={{ ...JOKE_CARD, width: "100%", height: "100%" }} />
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

const JokeCard = ({ joke }: { joke: Joke }) => {
  const ref = React.useRef<ScrollView>(null)
  if (joke === undefined) return null

  return (
    <View style={JOKE_CARD}>
      <ScrollView
        ref={ref}
        // @ts-ignore
        onContentSizeChange={() => ref?.current?.flashScrollIndicators()}
        contentContainerStyle={SCROLL_VIEW_STYLE}
        scrollIndicatorInsets={{
          top: spacing[4],
          bottom: spacing[4],
          left: spacing[5],
        }}
      >
        <Text h3 text={joke.title} style={JOKE_TITLE} />
        <Text
          style={JOKE_TEXT}
          text={joke?.body
            .split(/\n/g)
            .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
            .join("\n")}
        />
        {joke.category ? (
          <View style={CATEGORY_SECTION}>
            <Text text="Category: " />
            <Text style={CATEGORY_PILL} text={joke.category} />
          </View>
        ) : null}
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
const JOKE_CARD: ViewStyle = {
  borderRadius: 50,
  marginHorizontal: spacing[2],
  backgroundColor: "white",
  padding: spacing[4],
  borderColor: color.line,
  borderWidth: 1,
  position: "relative",
  flex: 0.5,
}
const JOKE_TITLE: TextStyle = {
  color: color.storybookDarkBg,
  paddingHorizontal: spacing[5],
}
const JOKE_TEXT: TextStyle = {
  marginTop: spacing[3],
  fontSize: 18,
  padding: spacing[2],
  paddingBottom: "5%",
  textAlign: "center",
}
const CATEGORY_SECTION: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  paddingHorizontal: spacing[3],
  alignItems: "center",
  justifyContent: "center",
}
const CATEGORY_PILL: TextStyle = {
  color: color.text,
  backgroundColor: color.line,
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[3],
  borderRadius: 30,
  borderColor: color.text,
}

export type Joke = {
  body: string
  id: string
  category: string
  random: string
  title: string
  bookmarked: boolean
  reviews: {
    count: number
    score: number
  }
  jokeLength: number
}
const defaultJokeState = {
  body: "",
  id: "",
  category: "",
  random: "",
  title: "",
  bookmarked: false,
  reviews: {
    count: 0,
    score: 0,
  },
  jokeLength: 0,
}
