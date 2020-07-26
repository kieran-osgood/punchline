/* eslint-disable react-native/no-inline-styles */
import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '681986405885-jq70bsbonfl2f9sl9aikc3687qklaf5m.apps.googleusercontent.com',
  iosClientId:
    '681986405885-oms8c4edds7s1cjlm550ss1sa8rqui7d.apps.googleusercontent.com',
});

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
      <GoogleSignIn />
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

const GoogleSignIn = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <GoogleSigninButton
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('Signed in with Google!'))
          .catch((e) => Reactotron.log!(e))
      }
    />
  );
};
