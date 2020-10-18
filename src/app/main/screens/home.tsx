import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import ChatBubble from 'components/chat-bubble';
// import Microphone from 'assets/images/microphone';
import AppLogo from 'components/app-logo';
import useGetCategories from 'components/useGetCategories';
import { useCategoriesContext } from 'components/categories-context';
import { CategorySettings } from 'components/select-pills';
import { getCurrentUser } from 'app/api';

import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
  useGetCategories();
  return (
    <CenterView>
      <Header />
      <JokeSection />
    </CenterView>
  );
}

const Header = () => (
  <>
    <View style={LOGO_CONTAINER}>
      <AppLogo style={LOGO} width={130} />
    </View>
    <BannerAd
      unitId={TestIds.BANNER} // ! Setup to check process.env
      size={BannerAdSize.SMART_BANNER}
    />
  </>
);

const LOGO_CONTAINER: ViewStyle = {
  width: '100%',
};

const LOGO: ViewStyle = {
  padding: spacing[1],
  alignSelf: 'auto',
  justifyContent: 'flex-start',
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

const JokeSection = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [joke, setJoke] = useState<Joke>({
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
  });
  const { categories } = useCategoriesContext();
  useEffect(() => {
    const loadFirstJoke = async () => setJoke(await getRandomJoke(categories));
    loadFirstJoke();
  }, [categories]);

  const newJoke = async (rating?: boolean) => {
    if (typeof rating === 'boolean') {
      updateRating({ rating, joke });
      addToHistory({ joke, rating, bookmark: bookmarked });
    }
    setJoke(await getRandomJoke(categories));
    setBookmarked(false);
  };
  // const calculateScore = () => {
  //   if (joke?.reviews?.count > 0) {
  //     const score = joke?.reviews?.score / joke?.reviews?.count;
  //     return score;
  //   }
  //   return '50';
  // };

  // const getTextColor = () => (calculateScore() >= 50 ? GREEN_TEXT : RED_TEXT);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: spacing[2],
        width: '100%',
      }}>
      <Text
        h2
        text={joke.title}
        style={{
          color: color.storybookDarkBg,
        }}
      />
      <View>
        <ChatBubble>
          <Text
            style={{ fontSize: 18, padding: spacing[2] }}
            text={joke.body}
          />
        </ChatBubble>
        {/*
        <View style={RATINGS_STRIP}>
          <Icon name="thumb" />
          <Text
            h3
            style={getTextColor()}
            text={`${String(calculateScore())}%`}
          />
        </View> */}
      </View>
      <View style={BUTTONS_CONTAINER}>
        <TouchableOpacity onPress={() => newJoke(false)}>
          <CryingEmoji style={{ marginHorizontal: spacing[3] }} />
        </TouchableOpacity>
        <Icon
          name={bookmarked ? 'star' : 'staro'}
          size={40}
          color={bookmarked ? color.success : color.palette.black}
          onPress={() => setBookmarked(!bookmarked)}
        />
        <TouchableOpacity onPress={() => newJoke(true)}>
          <LaughingEmoji style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// const RATINGS_STRIP: ViewStyle = {
//   flexDirection: 'row',
// };
// const GREEN_TEXT: TextStyle = {
//   color: 'green',
// };
// const RED_TEXT: TextStyle = {
//   color: 'red',
// };
const BUTTONS_CONTAINER: ViewStyle = {
  position: 'absolute',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  width: '80%',
  bottom: 15,
};
const getRandomJoke = async (categories: CategorySettings[]): Promise<Joke> => {
  var randomIdx = Math.floor(Math.random() * categories.length);
  const category = categories[randomIdx];
  const jokesRef = firestore().collection('jokes');
  const randomId = jokesRef.doc().id;

  let jokesQuery = jokesRef.where('random', '>', randomId).limit(1);

  if (category !== undefined) {
    jokesQuery = jokesRef
      .where('category', '==', category.name)
      .where('random', '>', randomId)
      .limit(1);
  }

  const jokesSnapshot = await jokesQuery.get();
  const joke = jokesSnapshot.docs[0].data() as Joke;
  if (!joke.hasOwnProperty('reviews')) {
    joke.reviews = {
      count: 0,
      score: 0,
    };
  }
  return joke;
};

export const addToHistory = async ({
  joke,
  rating,
  bookmark,
}: {
  joke: Joke;
  rating: boolean;
  bookmark: boolean;
}): Promise<boolean> => {
  const userRef = await getCurrentUser(false);
  const addToBookmark = {
    bookmarked: bookmark,
    dateBookmarked: bookmark ? new Date() : null,
  };
  const ratings = rating !== undefined ? { rating } : {};
  try {
    userRef
      .collection('history')
      .doc(joke.random)
      .set({
        ...joke,
        rating,
        dateSeen: new Date(),
        ...addToBookmark,
        ...ratings,
      });
    return true;
  } catch (error) {
    crashlytics().log(error);

    return false;
  }
};

export const updateRating = async ({
  rating,
  joke,
}: {
  rating: boolean;
  joke: Joke;
}): Promise<boolean> => {
  try {
    const scoreAdjustment = rating
      ? { score: firestore.FieldValue.increment(1) }
      : {};
    await firestore()
      .collection('jokes')
      .doc(joke.random)
      .set(
        {
          reviews: {
            count: firestore.FieldValue.increment(1),
            ...scoreAdjustment,
          },
        },
        { merge: true },
      );
    return true;
  } catch (error) {
    crashlytics().log(error);
    return false;
  }
};
