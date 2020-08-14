import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Text } from 'react-native-elements';
import SelectPills from 'components/select-pills';
import CenterView from 'components/centerview';
import firestore from '@react-native-firebase/firestore';

export default function Settings() {
  const [settings, setSettings] = useState(data);
  useEffect(() => {
    const user = firestore().collection('users').doc(auth().currentUser?.uid);
    user.update({ categories: settings });
  }, [settings]);
  return (
    <CenterView>
      <CenterView style={{ flex: 0, marginBottom: 80 }}>
        <Text>Categories</Text>
        <SelectPills
          data={data}
          onValueChange={(value) => setSettings(value)}
        />
      </CenterView>
      <View>
        <Button title="Logout" raised onPress={() => auth().signOut()} />
      </View>
    </CenterView>
  );
}

const data = [
  {
    name: 'Dad jokes',
    isActive: false,
  },
  {
    name: 'NSFW',
    isActive: true,
  },
];
