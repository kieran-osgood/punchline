import React from 'react';
import { Text, StyleSheet } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CenterView from 'components/centerview';
import { AuthNavigationProps } from 'auth/auth-param-list';

export default function Login({ navigation }: AuthNavigationProps<'Login'>) {
  return (
    <CenterView>
      <GoogleSignIn />

      <LoginButton
        title={'Email/Password'}
        onPress={() => {
          navigation.navigate('EmailPassword');
        }}
      />

      <LoginButton
        title="Continue as guest"
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
      />
    </CenterView>
  );
}
interface LoginButtonProps {
  onPress: () => void;
  title: string;
}
const LoginButton = ({ onPress, title }: LoginButtonProps) => (
  <TouchableOpacity
    style={styles.loginButton}
    accessibilityLabel={title}
    onPress={() => onPress()}>
    <Text style={styles.loginButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#F3F4F4',
    width: 305,
    height: 42,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#000',
  },
});

const GoogleSignIn = () => {
  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('Signed in with Google!'))
          .catch((e) => Reactotron.log!(e))
      }
    />
  );
};
