import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  const snapshot = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .get();
  return snapshot?.data()?.categories;
};
