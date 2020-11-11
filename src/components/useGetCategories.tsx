import { useEffect } from 'react';
import { useCategoriesContext } from 'components/categories-context';
import firestore from '@react-native-firebase/firestore';

const useGetCategories = () => {
  const { categories, setCategories } = useCategoriesContext();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .onSnapshot((docSnapshot) => {
        if (docSnapshot !== null) {
          const data = docSnapshot.docs.map(
            (doc) => doc.data() as { name: string },
          );
          setCategories(data);
        }
      });
    return () => unsubscribe();
  }, [setCategories]);
  return categories;
};

export default useGetCategories;
