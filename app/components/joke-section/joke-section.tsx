/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native'
// import * as SplashScreen from 'expo-splash-screen'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { observer } from "mobx-react-lite"

import { color, spacing } from 'theme'

import { Text, CenterView, Controls, } from 'components'

import Swiper from 'react-native-deck-swiper'
import {
  getRandomJoke,
  updateRating,
  addToHistory,
  getInitialJokes,
} from 'app/api'
import useSound from 'src/hooks/use-sound'
import { LocalStorageKeys } from 'src/types'
import { JokeLengthSetting, SoundSetting } from 'screens/settings'
import useSetting from 'src/hooks/use-setting'

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
  const { style } = props
  const [bookmarked, setBookmarked] = React.useState(false)
  const [jokes, setJokes] = React.useState<Joke[]>([])
  const { userCategories } = useCategoriesContext()
  const firstRender = React.useRef(true)
  const swiper = React.useRef<Swiper<Joke>>(null)
  const [currentJoke, setCurrentJoke] = React.useState<Joke>(defaultJokeState)
  const [soundSetting] = useSetting<SoundSetting>(
    LocalStorageKeys.soundIsMuted,
    'unmuted',
  )
  const [jokeLength] = useSetting<JokeLengthSetting>(
    LocalStorageKeys.jokeLength,
    'short',
  )
  const [isReady, setIsReady] = React.useState(false)

  const laugh = useSound(require('assets/sounds/laugh.mp3'))
  const boo = useSound(require('assets/sounds/boo.mp3'))

  React.useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (userCategories !== undefined) {
      const loadFirstJoke = async () => {
        getInitialJokes(userCategories, jokeLength)
          .then((newJokes) => {
            setJokes(newJokes)
            // @ts-ignore
            setCurrentJoke(newJokes[swiper.current?.state.firstCardIndex])
            swiper.current?.setState((prevState) => ({
              ...prevState,
              cards: newJokes,
            }))
          })
          .finally(() => {
            setIsReady(true)
          })
      }

      loadFirstJoke()
    }
  }, [userCategories, jokeLength])

  const resetAudio = async () => {
    laugh.pauseAsync()
    boo.pauseAsync()
    laugh.setPositionAsync(0)
    boo.setPositionAsync(0)
  }

  const fetchNewJoke = async (rating?: boolean) => {
    if (typeof rating === 'boolean') {
      if (soundSetting === 'unmuted') {
        await resetAudio()
        if (rating) {
          laugh.playAsync()
        } else {
          boo.playAsync()
        }
      }
      updateRating({ rating, joke: currentJoke })
      addToHistory({ joke: currentJoke, rating, bookmark: bookmarked })
    }
    if (userCategories !== undefined) {
      getRandomJoke(userCategories, 0, jokeLength).then((newJoke) => {
        if (newJoke.length === 0) fetchNewJoke()
        setJokes((currentJokes) => [...currentJokes, ...newJoke])
        swiper.current?.setState((prevState) => ({
          ...prevState,
          cards: [...jokes, newJoke],
        }))
        // @ts-ignore
        setCurrentJoke(jokes[swiper.current?.state.firstCardIndex + 1])
        setBookmarked(false)
      })
    }
  }

  // const calculateScore = () => {
  //   if (joke?.reviews?.count > 0) {
  //     const score = joke?.reviews?.score / joke?.reviews?.count;
  //     return score;
  //   }
  //   return '50';
  // };
  return (
    <>
    <CenterView style={{ width: '100%' }}>
      {jokes.length > 0 ? (
        <Swiper
          ref={swiper}
          cards={jokes}
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
          containerStyle={{ marginTop: 20 }}
          verticalSwipe={false}
          horizontalSwipe={false}
          disablePanresponder={false}
          showSecondCard
          keyExtractor={(jokeCard) => jokeCard?.random}
          renderCard={(jokeCard) => (
            <JokeCard key={jokeCard?.random} joke={jokeCard} />
          )}
          backgroundColor={color.background}
          stackSize={3}
        />
      ) : (
        <View style={{ ...JOKE_CARD, width: '100%', height: '100%' }} />
      )}
    </CenterView>

    <Controls
      bookmarked={bookmarked}
      onUpVotePress={() => {
        swiper.current?.swipeRight()
        fetchNewJoke(true)
      }}
      onDownVotePress={() => {
        swiper.current?.swipeLeft()
        fetchNewJoke(false)
      }}
      onBookmarkPress={() => setBookmarked(!bookmarked)}
      onSkipPress={() => {
        swiper.current?.swipeTop()
        fetchNewJoke()
      }}
    />
  </>
  )
})

const SCROLL_VIEW_STYLE: ViewStyle = {
  alignItems: 'center',
  marginTop: spacing[2],
  justifyContent: 'space-between',
  minHeight: '84%',
  paddingBottom: hp('5%'),
}
const JOKE_CARD: ViewStyle = {
  borderRadius: 50,
  marginHorizontal: spacing[2],
  backgroundColor: 'white',
  padding: spacing[4],
  borderColor: color.line,
  borderWidth: 1,
  position: 'relative',
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
  paddingBottom: '5%',
  textAlign: 'center',
}
const CATEGORY_SECTION: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  paddingHorizontal: spacing[3],
  alignItems: 'center',
  justifyContent: 'center',
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
  body: string;
  id: string;
  category: string;
  random: string;
  title: string;
  bookmarked: boolean;
  reviews: {
    count: number;
    score: number;
  };
  jokeLength: number;
};
const defaultJokeState = {
  body: '',
  id: '',
  category: '',
  random: '',
  title: '',
  bookmarked: false,
  reviews: {
    count: 0,
    score: 0,
  },
  jokeLength: 0,
}
