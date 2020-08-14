import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Text } from 'react-native-elements';
import SelectPills from 'components/select-pills';
import CenterView from 'components/centerview';
import firestore from '@react-native-firebase/firestore';
import { CategorySettings } from 'components/select-pills';

export default function Settings() {
  const [settings, setSettings] = useState<CategorySettings>([]);

  useEffect(() => {
    const user = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot((snap) => {
        setSettings(snap.data()?.categories);
      });
    return () => user();
  }, []);

  const handleValueChanged = (value: CategorySettings) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .set({ categories: value });
    setSettings(value);
  };

  return (
    <CenterView>
      <CenterView style={{ flex: 0, marginBottom: 80 }}>
        <Text>Categories</Text>
        {settings.length > 0 ? (
          <SelectPills
            data={settings}
            onValueChange={(value) => handleValueChanged(value)}
          />
        ) : (
          <></>
        )}
      </CenterView>
      <View>
        <Button title="Logout" raised onPress={() => auth().signOut()} />
      </View>
    </CenterView>
  );
}

// const data = [
//   {
//     name: 'Dad jokes',
//     isActive: false,
//   },
//   {
//     name: 'NSFW',
//     isActive: false,
//   },
//   {
//     name: 'Tech',
//     isActive: false,
//   },
//   {
//     name: 'Dark',
//     isActive: false,
//   },
// ];
