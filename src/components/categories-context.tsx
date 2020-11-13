import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { CategorySettings } from 'components/select-pills';

const CategoriesContext = React.createContext<{
  userCategories: CategorySettings[] | undefined;
  setUserCategories: Dispatch<SetStateAction<CategorySettings[]>>;

  categories: Category[] | undefined;
  setCategories: Dispatch<SetStateAction<Category[]>>;
}>({
  userCategories: undefined,
  setUserCategories: () => {},
  categories: undefined,
  setCategories: () => {},
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCategories, setUserCategories] = useState<CategorySettings[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const value = {
    userCategories,
    setUserCategories,
    categories,
    setCategories,
  };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);

export type Category = {
  id: string;
  name: string;
};
