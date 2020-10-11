import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { CategorySettings } from 'components/select-pills';

const CategoriesContext = React.createContext<{
  categories: CategorySettings[];
  setCategories: Dispatch<SetStateAction<CategorySettings[]>>;
}>({
  categories: [],
  setCategories: () => {},
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<CategorySettings[]>([]);
  const value = { categories, setCategories };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
