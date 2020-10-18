import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import ChatBubble from 'components/chat-bubble';
import Microphone from 'assets/images/microphone';
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
  /**
   * ===== ORDER OF ATTACK ======
   * When a user submits they're rating for a joke, add it to the 'user/{user}/jokes' sub-collection
   * add the FULL joke + rating they gave (not to be confused with the average rating)
   * this enables us to show a history/bookmark page (need to add a bookmark field also)
   * ! use the array-contains?: https://cloud.google.com/firestore/docs/query-data/queries#node.js_6
   * const joke = jokesRef.where('category', 'array-contains', 'blonde').get(); (works if 'category' === Category[])
   * when we've pulled the joke, we need to make sure it doesn't match an id in the 'user/{user}/jokes' sub-collection
   */

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

  const newJoke = async (feedback?: boolean) => {
    if (typeof feedback === 'boolean') {
      updateRating({ rating: feedback, joke });
      addToHistory({ rating: Number(feedback), joke });
    }
    if (bookmarked && typeof feedback === 'boolean') {
      addToBookmarks({ joke, feedback });
    }
    setJoke(await getRandomJoke(categories));
    setBookmarked(false);
  };

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
      <ChatBubble>
        <Text style={{ fontSize: 18, padding: spacing[2] }} text={joke.body} />
        <Microphone
          style={{
            width: 200,
            height: 200,
            zIndex: 10,
            opacity: 0.4,
            position: 'absolute',
            bottom: '-100%',
            left: '25%',
            transform: [{ rotateZ: '-40deg' }],
          }}
        />
      </ChatBubble>

      <View style={BOOKMARK_BUTTON_CONTAINER}>
        <Icon
          name={bookmarked ? 'star' : 'staro'}
          size={40}
          color={bookmarked ? color.success : color.palette.black}
          onPress={() => setBookmarked(!bookmarked)}
        />
      </View>

      <View style={RATING_CONTROLS}>
        <TouchableOpacity onPress={() => newJoke(false)}>
          <CryingEmoji style={{ marginLeft: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => newJoke(true)}>
          <LaughingEmoji style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BOOKMARK_BUTTON_CONTAINER: ViewStyle = {
  width: '100%',
  borderRadius: 300,
  alignItems: 'center',
  position: 'absolute',
  top: '82%',
  left: 0,
};
const RATING_CONTROLS: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '90%',
  justifyContent: 'space-around',
};
const getRandomJoke = async (categories: CategorySettings[]): Promise<Joke> => {
  var randomIdx = Math.floor(Math.random() * categories.length);
  const category = categories[randomIdx];
  const jokesRef = firestore().collection('jokes');
  const randomId = jokesRef.doc().id;

  let jokesQuery = jokesRef.where('random', '>', randomId).limit(1);

  if (category !== undefined) {
    console.log('category: ', category);
    jokesQuery = jokesRef
      .where('category', '==', category.name)
      .where('random', '>', randomId)
      .limit(1);
  }

  const jokesSnapshot = await jokesQuery.get();
  return jokesSnapshot.docs[0].data() as Joke;
};

export const addToHistory = async ({
  joke,
  rating,
}: {
  joke: Joke;
  rating: number;
}): Promise<boolean> => {
  const userRef = await getCurrentUser(false);
  userRef
    .collection('history')
    .doc(joke.random)
    .set({ joke, rating: Number(rating) });
  return true;
};

export const addToBookmarks = async ({
  joke,
  feedback,
}: {
  joke: Joke;
  feedback: boolean;
}): Promise<boolean> => {
  try {
    const userRef = await getCurrentUser(false);
    userRef
      .collection('bookmarks')
      .doc(joke.random)
      .set({ ...joke, rating: feedback });
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
