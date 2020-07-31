import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import database from '@react-native-firebase/database';

export default function Home() {
  // const usersCollection = firestore().collection('jokes').get();
  // console.log('usersCollection: ', usersCollection);
  // database()
  //   .ref('/991')
  //   .once('value')
  //   .then((snapshot) => console.log('snapshot', snapshot));

  // Set an initializing state whilst Firebase connects

  return (
    <View style={styles}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
