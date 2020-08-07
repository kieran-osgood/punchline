import React from 'react';
import { Text } from 'react-native';
// import database from '@react-native-firebase/database';
import CenterView from 'components/centerview';

export default function Home() {
  // const usersCollection = firestore().collection('jokes').get();
  // console.log('usersCollection: ', usersCollection);
  // database()
  //   .ref('/991')
  //   .once('value')
  //   .then((snapshot) => console.log('snapshot', snapshot));

  // Set an initializing state whilst Firebase connects

  return (
    <CenterView>
      <Text>Home</Text>
    </CenterView>
  );
}
