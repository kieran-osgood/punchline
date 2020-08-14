import React from 'react';
import { StyleSheet } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import CenterView from 'components/centerview';
import { AuthNavigationProps } from 'auth/auth-param-list';

export default function LoginChoices({
  navigation,
}: AuthNavigationProps<'LoginChoices'>) {
  return (
    <CenterView>
      <GoogleSignIn />
      <EmailSignIn onPressEvent={() => navigation.navigate('EmailPassword')} />
      <GuestSignIn />
    </CenterView>
  );
}
const styles = StyleSheet.create({
  icon: {
    paddingTop: 2,
    paddingRight: 15,
  },
  loginButton: {
    backgroundColor: 'rgb(66, 133, 244)',
  },
  loginButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    width: 305,
    marginVertical: 16,
  },
  textSeperator: {
    fontSize: 15,
    marginVertical: 8,
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
          .then((userCredential) => createUserSettings(userCredential))
          .catch((e) => Reactotron.log!(e))
      }
    />
  );
};

const EmailSignIn = ({ onPressEvent }: { onPressEvent: () => void }) => (
  <Button
    title="Email & Password"
    raised
    buttonStyle={styles.loginButton}
    titleStyle={styles.loginButtonTitle}
    containerStyle={styles.loginButtonContainer}
    icon={<Icon name="md-mail" size={16} color="white" style={styles.icon} />}
    onPress={onPressEvent}
  />
);

const GuestSignIn = () => (
  <>
    <Text style={styles.textSeperator}>Or</Text>

    <Button
      title="Continue as guest"
      type="clear"
      onPress={() => {
        auth()
          .signInAnonymously()
          .then((userCredential) => createUserSettings(userCredential))
          .catch((error) => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }
            console.error(error);
          });
      }}
    />
  </>
);

export const createUserSettings = (
  userCredential: FirebaseAuthTypes.UserCredential,
) =>
  firestore()
    .collection('users')
    .doc(userCredential.user.uid)
    .set({ categories: [] });
