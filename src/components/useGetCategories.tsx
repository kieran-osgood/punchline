import { useEffect } from 'react';
import { useCategoriesContext } from 'components/categories-context';
import { getUserCategories } from 'src/app/api';

const useGetCategories = () => {
  const { setCategories } = useCategoriesContext();

  useEffect(() => {
    async function getCategories() {
      const userCategories = await getUserCategories();
      setCategories(userCategories?.filter((categ) => categ.isActive) ?? []);
    }
    getCategories();
  }, [setCategories]);
};

export default useGetCategories;
