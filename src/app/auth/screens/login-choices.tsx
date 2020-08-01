import React from 'react';
import { Button } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

import CenterView from '../../../components/centerview';
import { AuthNavigationProps } from '../auth-param-list';

export default function Login({ navigation }: AuthNavigationProps<'Login'>) {
  return (
    <CenterView>
      <GoogleSignIn />
      <Button
        onPress={() => {
          navigation.navigate('EmailPassword');
        }}
        title="Email/Password"
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
        title="Continue as guest"
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
