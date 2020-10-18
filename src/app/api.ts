import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { Joke } from 'app/main/screens/home';
import { CategorySettings } from 'components/select-pills';

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
  CategorySettings[] | undefined
> => {
  const snapshot = await getCurrentUser(true);
  return snapshot?.categories;
};

type User = {
  categories: CategorySettings[];
  history: Joke[];
  bookmarks: Joke[];
};

export function getCurrentUser(dataOnly: true): Promise<User>;
export function getCurrentUser(
  dataOnly: false,
): Promise<
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
>;
export async function getCurrentUser(dataOnly: boolean = false) {
  const userRef = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid);
  if (dataOnly) {
    const userSnapshot = await userRef.get();
    return userSnapshot.data() as User;
  }
  return userRef;
}
