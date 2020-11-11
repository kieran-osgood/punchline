import React, { useEffect, useReducer, Reducer } from 'react';
import { View, ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';

import { color, spacing } from 'theme';

import { BUTTON_CONTAINER, PILL_BUTTON } from 'auth/screens/login-choices';

import Text from 'components/text';
import CenterView from 'components/centerview';
import SelectPills, { CategorySettings } from 'components/select-pills';
import { getCategories, getCurrentUser } from 'src/app/api';
import useGetUserCategories from 'components/useGetUserCategories';

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
  const userCategories = useGetUserCategories();
  const [state, dispatch] = useReducer<Reducer<reducerState, reducerAction>>(
    settingsReducer,
    { categories: [] },
  );

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
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
  }, [userCategories]);

  const handleValueChanged = async (value: CategorySettings[]) => {
    const user = await getCurrentUser(false);
    user.set({ categories: value });
    dispatch({ type: 'CATEGORY', payload: value });
  };

  return (
    <CenterView style={CONTAINER}>
      <CenterView style={{ flex: 0, marginBottom: 80, width: '100%' }}>
        <Text h3>Categories</Text>
        <SelectPills
          data={state.categories}
          onValueChange={(value) => handleValueChanged(value)}
        />
      </CenterView>
      <View>
        <Button
          buttonStyle={PILL_BUTTON}
          titleStyle={{ color: color.text }}
          containerStyle={BUTTON_CONTAINER}
          onPress={() => auth().signOut()}
          title="Logout"
          raised
        />
      </View>
    </CenterView>
  );
}
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
};
