import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import '@react-native-firebase/app';
import Reactotron from 'reactotron-react-native';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-community/google-signin';

import { AuthNavigationProps } from 'auth/auth-param-list';

import { color, spacing } from 'theme/index';
import Text from 'components/text';
import CenterView from 'components/centerview';

import Facebook from 'assets/images/facebook';
import GoogleIcon from 'assets/images/google';
import Gmail from 'assets/images/gmail';
import AppLogo from 'components/app-logo';

export default function LoginChoices({
  navigation,
}: AuthNavigationProps<'LoginChoices'>) {
  return (
    <CenterView>
      <Text h1 text="Login" />
      <GoogleSignIn />
      <FacebookSignIn />
      <EmailSignIn onPressEvent={() => navigation.navigate('EmailPassword')} />

      <Text style={textSeperator} text="Or" />

      <GuestSignIn />
      <AppLogo style={{ marginBottom: 'auto' }} />
    </CenterView>
  );
}

export const pillButton: ViewStyle = {
  borderRadius: 100,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
};

export const buttonIcon: ViewStyle = {
  position: 'absolute',
  left: spacing[6],
};

export const buttonTitle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  width: '100%',
  color: color.text,
  marginLeft: '40%',
  textAlign: 'left',
};

export const buttonContainer: ViewStyle = {
  width: 305,
  marginVertical: spacing[4],
};

const textSeperator: TextStyle = {
  fontSize: 15,
  marginVertical: spacing[2],
};

const GoogleSignIn = () => {
  const handlePress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    createUserSettings(userCredential);
  };

  return (
    <Button
      title="Log in with Google"
      buttonStyle={pillButton}
      titleStyle={buttonTitle}
      containerStyle={buttonContainer}
      raised
      icon={<GoogleIcon style={buttonIcon} />}
      onPress={() => handlePress()}
    />
  );
};

const FacebookSignIn = () => {
  const handlePress = async () => Reactotron.log!('Press');

  return (
    <Button
      title="Log in with Facebook"
      buttonStyle={pillButton}
      titleStyle={buttonTitle}
      containerStyle={buttonContainer}
      raised
      icon={<Facebook style={buttonIcon} />}
      onPress={() => handlePress()}
    />
  );
};

const EmailSignIn = ({ onPressEvent }: { onPressEvent: () => void }) => (
  <Button
    title="Log in with Email"
    raised
    buttonStyle={pillButton}
    titleStyle={buttonTitle}
    containerStyle={buttonContainer}
    icon={<Gmail style={buttonIcon} />}
    onPress={onPressEvent}
  />
);

const GuestSignIn = () => (
  <>
    <Button
      title="Continue as guest"
      type="clear"
      onPress={() => {
        auth()
          .signInAnonymously()
          .then((userCredential) => {
            Reactotron.log!(userCredential);
            createUserSettings(userCredential);
          })
          .catch((error) => {
            if (error.code === 'auth/operation-not-allowed') {
              Reactotron.log!('Enable anonymous in your firebase console.');
            }
            console.error(error);
          });
      }}
    />
  </>
);

export const createUserSettings = (
  userCredential: FirebaseAuthTypes.UserCredential,
) => {
  // Create a reference to the user
  const userReference = firestore().doc(`users/${userCredential.user.uid}`);

  return firestore().runTransaction(async (transaction) => {
    // Get post data first
    const userSnapshot = await transaction.get(userReference);
    if (!userSnapshot.exists) {
      userReference
        .set({ categories: [] })
        .catch((error) => Reactotron.log!(error));
    }
  });
};
