import React from 'react';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import CenterView from '../../../components/centerview';

export default function settings() {
  return (
    <CenterView>
      <Text>test</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </CenterView>
  );
}
