import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import * as SplashScreen from 'expo-splash-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { color, spacing } from 'theme';

import Text from 'components/text';
import { useCategoriesContext } from 'components/categories-context';
import { CategorySettings } from 'components/select-pills';
import { getCurrentUser } from 'app/api';

import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CenterView from 'components/centerview';
import Swiper from 'react-native-deck-swiper';

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
  const [bookmarked, setBookmarked] = React.useState(false);
  const [joke, setJoke] = React.useState<Joke>({
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
  const { userCategories } = useCategoriesContext();
  const firstRender = React.useRef(true);
  const swiper = React.useRef<Swiper<string>>(null);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (userCategories !== undefined) {
      const loadFirstJoke = async () => {
        getRandomJoke(userCategories).then((newJoke) => {
          setJoke(newJoke);
          SplashScreen.hideAsync();
        });
      };

      loadFirstJoke();
    }
  }, [userCategories]);

  const newJoke = async (rating?: boolean) => {
    if (typeof rating === 'boolean') {
      updateRating({ rating, joke });
      addToHistory({ joke, rating, bookmark: bookmarked });
    }
    if (userCategories !== undefined) {
      setJoke(await getRandomJoke(userCategories));
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
        h2
        text={joke.title}
        style={{
          color: color.storybookDarkBg,
          paddingHorizontal: spacing[5],
        }}
      />
      <CenterView style={{ width: '100%', marginTop: spacing[2] }}>
        <Swiper
          ref={swiper}
          cards={cards}
          cardHorizontalMargin={0}
          infinite
          cardVerticalMargin={0}
          verticalSwipe={false}
          horizontalSwipe={false}
          disablePanresponder={false}
          renderCard={(jokeCard) => <JokeCard joke={jokeCard} />}
          cardIndex={0}
          backgroundColor={color.background}
          stackSize={2}
        />
      </CenterView>

      <View style={BUTTONS_CONTAINER}>
        <TouchableOpacity
          onPress={() => {
            swiper.current?.swipeLeft();
            newJoke(false);
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
            newJoke(true);
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
const getRandomJoke = async (categories: CategorySettings[]): Promise<Joke> => {
  var randomIdx = Math.floor(Math.random() * categories.length);
  const category = categories[randomIdx];
  const jokesRef = firestore().collection('jokes');
  const randomId = jokesRef.doc().id;

  let jokesQuery = jokesRef.where('random', '>', randomId).limit(1);

  console.log('category: ', category);
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

const JokeCard = ({ joke }: { joke: string }) => {
  const ref = React.useRef<ScrollView>(null);

  return (
    <>
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
              text={joke}
              // text={joke.body
              //   .split(/\n/g)
              //   .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
              //   .join('\n')}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const cards = [
  'DO DOODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODDO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DO',
  'DO DOODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODDO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DO',
];
