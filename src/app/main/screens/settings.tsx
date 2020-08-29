import React, { useEffect, useReducer, Reducer } from 'react';
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';

import SelectPills, { CategorySettings } from 'components/select-pills';
import CenterView from 'components/centerview';
import Text from 'components/text';

type reducerAction = { type: 'CATEGORY'; payload: CategorySettings[] };
type reducerState = {
  categories: CategorySettings[];
};

const settingsReducer = (state: reducerState, action: reducerAction) => {
  switch (action.type) {
    case 'CATEGORY':
      return { ...state, categories: [...action.payload] };
  }
};

export default function Settings() {
  const [state, dispatch] = useReducer<Reducer<reducerState, reducerAction>>(
    settingsReducer,
    { categories: [] },
  );

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      const userCategories = await getUserCategories();
      const results = categories.map((category) => {
        const match = userCategories?.find((x) => x.id === category.id);
        if (match) {
          return { ...category, ...match };
        }
        return category;
      });
      dispatch({ type: 'CATEGORY', payload: results });
    }
    fetchData();
  }, []);

  const handleValueChanged = (value: CategorySettings[]) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .set({ categories: value });

    dispatch({ type: 'CATEGORY', payload: value });
  };

  return (
    <CenterView>
      <CenterView style={{ flex: 0, marginBottom: 80, width: '100%' }}>
        <Text h3 style={{ width: '90%' }}>
          Categories
        </Text>
        <SelectPills
          data={state.categories}
          onValueChange={(value) => handleValueChanged(value)}
        />
      </CenterView>
      <View>
        <Button title="Logout" raised onPress={() => auth().signOut()} />
      </View>
    </CenterView>
  );
}

const getCategories = async () => {
  const snapshot = await firestore().collection('categories').get();
  return snapshot.docs.map((doc) => {
    return {
      ...(doc.data() as CategorySettings),
      id: doc.id,
    };
  });
};

const getUserCategories = async (): Promise<CategorySettings[] | undefined> => {
  const snapshot = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .get();
  return snapshot?.data()?.categories;
};
