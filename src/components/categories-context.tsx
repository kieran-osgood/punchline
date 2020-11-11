import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { CategorySettings } from 'components/select-pills';

const CategoriesContext = React.createContext<{
  userCategories: CategorySettings[];
  setUserCategories: Dispatch<SetStateAction<CategorySettings[]>>;

  categories: { name: string }[];
  setCategories: Dispatch<SetStateAction<{ name: string }[]>>;
}>({
  userCategories: [],
  setUserCategories: () => {},
  categories: [],
  setCategories: () => {},
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCategories, setUserCategories] = useState<CategorySettings[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);

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
