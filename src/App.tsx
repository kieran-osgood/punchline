/* eslint-disable react-native/no-inline-styles */
import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// import database from '@react-native-firebase/database';

export default function App() {
  // const usersCollection = firestore().collection('jokes').get();
  // console.log('usersCollection: ', usersCollection);
  // database()
  //   .ref('/991')
  //   .once('value')
  //   .then((snapshot) => console.log('snapshot', snapshot));

  // Set an initializing state whilst Firebase connects

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      Reactotron.log!('sdgfdhfg', userState);
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  if (user !== null) {
    return (
      <View style={styles.container}>
        <Text>Welcome {user?.email}</Text>
        <Button
          title="Logout"
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeUsername(text)}
        value={email}
      />
      <TextInput
        style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
      />

      <Button
        onPress={() => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            });
        }}
        title="Login email/pass"
      />

      <Button
        onPress={() => {
          auth()
            .signInAnonymously()
            .then(() => {
              console.log('User signed in anonymously');
            })
            .catch((error) => {
              if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
              }

              console.error(error);
            });
        }}
        title="Login Anon"
      />
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
