import React from 'react';
import auth from '@react-native-firebase/auth';
import { Button, Text } from 'react-native-elements';

import CenterView from 'components/centerview';

export default function Settings() {
  return (
    <CenterView>
      <Text>test</Text>
      <Button title="Logout" raised onPress={() => auth().signOut()} />
    </CenterView>
  );
}
