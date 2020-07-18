import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import '@react-native-firebase/app';
// import Reactotron from 'reactotron-react-native';

// import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';

export default function App() {
  // const usersCollection = firestore().collection('jokes').get();
  // console.log('usersCollection: ', usersCollection);
  // database()
  //   .ref('/991')
  //   .once('value')
  //   .then((snapshot) => console.log('snapshot', snapshot));

  // Reactotron.log!('sdgfdhfg');

  return (
    <View style={styles.container}>
      <Text>Open up App. our app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);
