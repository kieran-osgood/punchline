import React, { useEffect, useReducer, Reducer } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Text } from 'react-native-elements';
import SelectPills from 'components/select-pills';
import CenterView from 'components/centerview';
import firestore from '@react-native-firebase/firestore';
import { CategorySettings } from 'components/select-pills';

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

  const getMarker = async () => {
    const snapshot = await firestore().collection('categories').get();
    return snapshot.docs.map((doc) => doc.data() as CategorySettings);
  };

  useEffect(() => {
    async function fetchData() {
      // console.log('fetchData');
      const result = await getMarker();
      dispatch({ type: 'CATEGORY', payload: result });
    }
    fetchData();
  }, []);

  // console.log('state: ', state.categories);
  // useEffect(() => {
  //   const user = firestore()
  //     .collection('users')
  //     .doc(auth().currentUser?.uid)
  //     .onSnapshot((snap) => {
  //       setSettings(snap.data()?.categories);
  //     });
  //   return () => user();
  // }, []);

  // const handleValueChanged = (value: CategorySettings) => {
  //   firestore()
  //     .collection('users')
  //     .doc(auth().currentUser?.uid)
  //     .set({ categories: value });
  //   setSettings(value);
  // };

  return (
    <CenterView>
      <CenterView style={{ flex: 0, marginBottom: 80 }}>
        <Text>Categories</Text>
        <SelectPills
          data={state.categories}
          // onValueChange={(value) => handleValueChanged(value)}
        />
      </CenterView>
      <View>
        <Button title="Logout" raised onPress={() => auth().signOut()} />
      </View>
    </CenterView>
  );
}
