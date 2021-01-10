import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';

import { Joke } from 'components/joke-section';
import { CategorySettings } from 'components/select-pills';
import { logErrorToCrashlytics, getRandomArrayItem } from 'src/utils';
import { JokeLengthSetting } from 'screens/settings';

export const getCategories = async () => {
  const snapshot = await firestore().collection('categories').get();
  return snapshot.docs.map((doc) => {
    return {
      ...(doc.data() as CategorySettings),
      id: doc.id,
    };
  });
};

export const getUserCategories = async (): Promise<
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
> => {
  return await getCurrentUser(false);
};

export type User = {
  categories: CategorySettings[];
  history: Joke[];
  bookmarks: Joke[];
};

export function getCurrentUser(dataOnly: true): Promise<User>;
export function getCurrentUser(
  dataOnly?: false,
): Promise<
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
>;
export async function getCurrentUser(dataOnly: boolean = false) {
  const userRef = firestore().collection('users').doc(auth().currentUser?.uid);
  if (dataOnly) {
    const userSnapshot = await userRef.get();
    return userSnapshot.data() as User;
  }
  return userRef;
}

export const getInitialJokes = async (
  categories: CategorySettings[],
  jokeLength: JokeLengthSetting = 'short',
): Promise<Joke[]> => {
  return getRandomJoke(categories, 0, jokeLength, 50);
};

export const getRandomJoke = async (
  categories: CategorySettings[],
  previousCount: number = 0,
  jokeSetting: JokeLengthSetting = 'short',
  limit: number = 5,
): Promise<Joke[]> => {
  let count = previousCount;
  const category = getRandomArrayItem(categories);
  const jokesRef = firestore().collection('jokes');
  const randomFirestoreDocId = jokesRef.doc().id;
  const jokeLength =
    jokeSetting === 'long' ? 5000 : jokeSetting === 'medium' ? 400 : 175;

  let jokesQuery = jokesRef
    .where('random', '>', randomFirestoreDocId)
    .limit(limit);
  if (category !== undefined) {
    jokesQuery = jokesRef
      .where('category', '==', category.name)
      .where('random', '>', randomFirestoreDocId)
      .where('jokeLength', '<', jokeLength)
      .limit(limit);
  }

  const jokesSnapshot = await jokesQuery.get();
  if (jokesSnapshot.docs.length === 0) {
    if (count > 5) {
      const errorMessage = `Can't find a new joke for user: ${
        auth().currentUser?.uid
      } with categories: ${categories.map((x) => x.name).join(', ')}`;
      crashlytics().log(errorMessage);
      throw Error(errorMessage);
    }
    return getRandomJoke(categories, ++count);
  }
  const jokes = jokesSnapshot.docs
    .map((doc) => {
      const joke = doc.data() as Joke;
      if (!joke.hasOwnProperty('reviews')) {
        joke.reviews = {
          count: 0,
          score: 0,
        };
      }
      if (joke.jokeLength > jokeLength) return undefined;
      return joke;
    })
    .filter(Boolean) as Joke[];

  return jokes;
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
    logErrorToCrashlytics('addToHistory');
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
    let errorMessage = 'updateRating';
    if (typeof error === 'string') {
      errorMessage = error;
    }
    logErrorToCrashlytics(errorMessage);
    return false;
  }
};
