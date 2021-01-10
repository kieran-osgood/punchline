import React from 'react';
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { color, spacing } from 'theme';

import Text from 'components/text';
import { useCategoriesContext } from 'components/categories-context';

import CenterView from 'components/centerview';
import Swiper from 'react-native-deck-swiper';
import {
  getRandomJoke,
  updateRating,
  addToHistory,
  getInitialJokes,
} from 'app/api';
import Controls from 'components/controls';
import useSound from 'src/hooks/use-sound';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { LocalStorageKeys } from 'src/types';
import { JokeLengthSetting, SoundSetting } from 'screens/settings';
import useSetting from 'src/hooks/use-setting';

const JokeSection = () => {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [jokes, setJokes] = React.useState<Joke[]>([]);
  const { userCategories } = useCategoriesContext();
  const firstRender = React.useRef(true);
  const swiper = React.useRef<Swiper<Joke>>(null);
  const [currentJoke, setCurrentJoke] = React.useState<Joke>(defaultJokeState);
  const [soundSetting] = useSetting<SoundSetting>(
    LocalStorageKeys.soundIsMuted,
    'unmuted',
  );
  const [jokeLength, setJokeLength] = useSetting<JokeLengthSetting>(
    LocalStorageKeys.jokeLength,
    'short',
  );

  const laugh = useSound(require('assets/sounds/laugh.mp3'));
  const boo = useSound(require('assets/sounds/boo.mp3'));

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (userCategories !== undefined) {
      const loadFirstJoke = async () => {
        getInitialJokes(userCategories)
          .then((newJokes) => {
            setJokes(newJokes);
            // @ts-ignore
            setCurrentJoke(newJokes[swiper.current?.state.firstCardIndex]);
            swiper.current?.setState((prevState) => ({
              ...prevState,
              cards: newJokes,
            }));
          })
          .finally(() => {
            setTimeout(() => {
              SplashScreen.hideAsync();
            }, 500);
          });
      };

      loadFirstJoke();
    }
  }, [userCategories]);

  const resetAudio = async () => {
    laugh.pauseAsync();
    boo.pauseAsync();
    laugh.setPositionAsync(0);
    boo.setPositionAsync(0);
  };

  const fetchNewJoke = async (rating?: boolean) => {
    await resetAudio();
    if (typeof rating === 'boolean') {
      if (soundSetting === 'unmuted') {
        if (rating) {
          laugh.playAsync();
        } else {
          boo.playAsync();
        }
      }
      updateRating({ rating, joke: currentJoke });
      addToHistory({ joke: currentJoke, rating, bookmark: bookmarked });
    }
    if (userCategories !== undefined) {
      getRandomJoke(userCategories, 0, jokeLength).then((newJoke) => {
        setJokes((currentJokes) => [...currentJokes, newJoke]);
        swiper.current?.setState((prevState) => ({
          ...prevState,
          cards: [...jokes, newJoke],
        }));
        // @ts-ignore
        setCurrentJoke(jokes[swiper.current?.state.firstCardIndex + 1]);
        setBookmarked(false);
      });
    }
  };

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
            keyExtractor={(jokeCard) => jokeCard.random}
            renderCard={(jokeCard) => (
              <JokeCard key={jokeCard.random} joke={jokeCard} />
            )}
            backgroundColor={color.background}
            stackSize={3}
          />
        ) : null}
      </CenterView>

      <Controls
        bookmarked={bookmarked}
        onUpVotePress={() => {
          swiper.current?.swipeRight();
          fetchNewJoke(true);
        }}
        onDownVotePress={() => {
          swiper.current?.swipeLeft();
          fetchNewJoke(false);
        }}
        onBookmarkPress={() => setBookmarked(!bookmarked)}
        onSkipPress={() => {
          swiper.current?.swipeTop();
          fetchNewJoke();
        }}
      />
    </>
  );
};

export default JokeSection;

const JokeCard = ({ joke }: { joke: Joke }) => {
  const ref = React.useRef<ScrollView>(null);
  if (joke === undefined) return null;

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
        }}>
        <Text h3 text={joke.title} style={JOKE_TITLE} />
        <Text
          style={JOKE_TEXT}
          text={joke.body
            .split(/\n/g)
            .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
            .join('\n')}
        />
        {joke.category ? (
          <View style={CATEGORY_SECTION}>
            <Text text="Category: " />
            <Text style={CATEGORY_PILL} text={joke.category} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
const SCROLL_VIEW_STYLE: ViewStyle = {
  alignItems: 'center',
  marginTop: spacing[2],
  justifyContent: 'space-between',
  minHeight: '84%',
  paddingBottom: hp('5%'),
};
const JOKE_CARD: ViewStyle = {
  borderRadius: 50,
  marginHorizontal: spacing[2],
  backgroundColor: 'white',
  padding: spacing[4],
  borderColor: color.line,
  borderWidth: 1,
  position: 'relative',
  flex: 0.5,
};
const JOKE_TITLE: TextStyle = {
  color: color.storybookDarkBg,
  paddingHorizontal: spacing[5],
};
const JOKE_TEXT: TextStyle = {
  marginTop: spacing[3],
  fontSize: 18,
  padding: spacing[2],
  paddingBottom: '5%',
  textAlign: 'center',
};
const CATEGORY_SECTION: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  paddingHorizontal: spacing[3],
  alignItems: 'center',
  justifyContent: 'center',
};
const CATEGORY_PILL: TextStyle = {
  color: color.text,
  backgroundColor: color.line,
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[3],
  borderRadius: 30,
  borderColor: color.text,
};

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
};
