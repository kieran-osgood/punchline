/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

import CenterView from '../../../components/centerview';
import { NavigationProps } from '../main-tabs';

export default function Login({ navigation }: NavigationProps<'Login'>) {
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
    navigation.navigate('Home');
    // return (
    //   <View style={styles.container}>
    //     <Text>Welcome {user?.email}</Text>
    //     <Button
    //       title="Logout"
    //       onPress={() => {
    //         auth().signOut();
    //       }}
    //     />
    //   </View>
    // );
  }
  return (
    <CenterView>
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
    </CenterView>
  );
}

const GoogleSignIn = () => {
  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
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
