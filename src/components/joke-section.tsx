import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { color, spacing } from 'theme';

import Text from 'components/text';
import { useCategoriesContext } from 'components/categories-context';

import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CenterView from 'components/centerview';
import Swiper from 'react-native-deck-swiper';
import {
  getRandomJoke,
  updateRating,
  addToHistory,
  getInitialJokes,
} from 'app/api';

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
// const defaultJokeStates = [
//   {
//     id: 'a',
//     body: 'a',
//     category: '',
//     random: 'a',
//     title: 'a',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: 'b',
//     body: 'b',
//     category: '',
//     random: 'b',
//     title: 'b',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: 'c',
//     body: 'c',
//     category: '',
//     random: 'c',
//     title: 'c',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: 'e',
//     body: 'e',
//     category: '',
//     random: 'e',
//     title: 'e',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
// ];

// const addNewJokes = [
//   {
//     id: '1',
//     body: '1',
//     category: '',
//     random: '1',
//     title: '1',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: '2',
//     body: '2',
//     category: '',
//     random: '2',
//     title: '2',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: '3',
//     body: '3',
//     category: '',
//     random: '3',
//     title: '3',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
//   {
//     id: '4',
//     body: '4',
//     category: '',
//     random: '4',
//     title: '4',
//     bookmarked: false,
//     reviews: {
//       count: 0,
//       score: 0,
//     },
//   },
// ];

const JokeSection = () => {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [jokes, setJokes] = React.useState<Joke[]>([defaultJokeState]);
  const { userCategories } = useCategoriesContext();
  const firstRender = React.useRef(true);
  const swiper = React.useRef<Swiper<Joke>>(null);
  const [currentJoke, setCurrentJoke] = React.useState<Joke>(defaultJokeState);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (userCategories !== undefined) {
      const loadFirstJoke = async () => {
        getInitialJokes(userCategories).then((newJokes) => {
          setJokes(newJokes);
          swiper.current?.setState((prevState) => ({
            ...prevState,
            cards: newJokes,
          }));
          // @ts-ignore
          setCurrentJoke(newJokes[swiper.current?.state.firstCardIndex]);
          SplashScreen.hideAsync();
        });
      };

      loadFirstJoke();
    }
  }, [userCategories]);

  const fetchNewJoke = async (rating?: boolean) => {
    if (typeof rating === 'boolean') {
      updateRating({ rating, joke: currentJoke });
      addToHistory({ joke: currentJoke, rating, bookmark: bookmarked });
    }
    if (userCategories !== undefined) {
      const newJoke = await getRandomJoke(userCategories);
      setJokes((currentJokes) => [...currentJokes, newJoke]);
      swiper.current?.setState((prevState) => ({
        ...prevState,
        cards: [...jokes, newJoke],
      }));
      // @ts-ignore
      setCurrentJoke(jokes[swiper.current?.state.firstCardIndex + 1]);
      setBookmarked(false);
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
      <Text
        h3
        text={currentJoke.title}
        style={{
          color: color.storybookDarkBg,
          paddingHorizontal: spacing[5],
        }}
      />
      <CenterView style={{ width: '100%', marginTop: spacing[2] }}>
        <Swiper
          ref={swiper}
          cards={jokes}
          cardHorizontalMargin={0}
          // infinite
          cardVerticalMargin={0}
          containerStyle={{ marginTop: 20 }}
          verticalSwipe={false}
          horizontalSwipe={false}
          disablePanresponder={false}
          showSecondCard
          // onSwiped={(cardIndex) => setNextValue(cardIndex + 1)}
          keyExtractor={(jokeCard) => jokeCard.random}
          renderCard={(jokeCard) => {
            return <JokeCard key={jokeCard.random} joke={jokeCard} />;
          }}
          backgroundColor={color.background}
          stackSize={3}
        />
      </CenterView>

      <View style={BUTTONS_CONTAINER}>
        <TouchableOpacity
          onPress={() => {
            swiper.current?.swipeLeft();
            fetchNewJoke(false);
          }}>
          <CryingEmoji style={{ marginHorizontal: spacing[3] }} />
        </TouchableOpacity>
        <Icon
          name={bookmarked ? 'star' : 'staro'}
          size={40}
          color={bookmarked ? color.success : color.palette.black}
          onPress={() => setBookmarked(!bookmarked)}
        />
        <TouchableOpacity
          onPress={() => {
            swiper.current?.swipeRight();
            fetchNewJoke(true);
          }}>
          <LaughingEmoji style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default JokeSection;

const BUTTONS_CONTAINER: ViewStyle = {
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};
const JokeCard = ({ joke }: { joke: Joke }) => {
  const ref = React.useRef<ScrollView>(null);

  return (
    <React.Fragment key={joke.random}>
      <View
        style={{
          borderRadius: 50,
          marginHorizontal: spacing[2],
          backgroundColor: 'white',
          padding: spacing[4],
          borderColor: 'grey',
          borderWidth: 1,
          position: 'relative',
          flex: 0.5,
        }}>
        <ScrollView
          ref={ref}
          // @ts-ignore
          onContentSizeChange={() => ref?.current?.flashScrollIndicators()}
          scrollEnabled
          showsVerticalScrollIndicator
          persistentScrollbar
          scrollIndicatorInsets={{
            top: spacing[4],
            bottom: spacing[4],
            right: spacing[1],
          }}>
          <View style={{ paddingBottom: hp('5%') }}>
            <Text
              style={{ fontSize: 18, padding: spacing[2] }}
              text={joke.body
                .split(/\n/g)
                .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
                .join('\n')}
            />
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};
