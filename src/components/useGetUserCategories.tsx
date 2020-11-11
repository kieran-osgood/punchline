import { useEffect } from 'react';
import { useCategoriesContext } from 'components/categories-context';
import { User } from 'src/app/api';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CategorySettings } from 'components/select-pills';

const useGetUserCategories = () => {
  const { userCategories, setUserCategories } = useCategoriesContext();
  useEffect(() => {
    const unsubscribe = firestore()
      .doc(`users/${auth().currentUser?.uid}`)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot !== null) {
          const data = docSnapshot.data() as User;
          setUserCategories(
            (data.categories.filter((category) => category.isActive) ??
              []) as CategorySettings[],
          );
        }
      });
    return () => unsubscribe();
  }, [setUserCategories]);
  return userCategories;
};

export default useGetUserCategories;
