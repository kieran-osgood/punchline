import { useEffect } from 'react';
import { Category, useCategoriesContext } from 'components/categories-context';
import firestore from '@react-native-firebase/firestore';

const useGetCategories = () => {
  const { categories, setCategories } = useCategoriesContext();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .onSnapshot((docSnapshot) => {
        if (docSnapshot !== null) {
          const data = docSnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as Category;
          });
          setCategories(data);
        }
      });
    return () => unsubscribe();
  }, [setCategories]);
  return categories;
};

export default useGetCategories;
