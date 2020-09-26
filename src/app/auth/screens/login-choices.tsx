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
      <AppLogo style={{ marginBottom: 'auto' }} />

      <Text h1 text="Register & Login" style={{ marginBottom: 'auto' }} />

      <CenterView style={{ flex: 0, marginBottom: 'auto' }}>
        <GoogleSignIn />
        <FacebookSignIn />
        <EmailSignIn
          onPressEvent={() => navigation.navigate('EmailPassword')}
        />
        <Text style={TEXT_SEPERATOR} text="Or" />
        <GuestSignIn />
      </CenterView>
      <Text
        text={`COPYRIGHT \u00A9 ${new Date().getFullYear()} KO.DEV`}
        style={COPYRIGHT_TEXT}
      />
    </CenterView>
  );
}

export const PILL_BUTTON: ViewStyle = {
  borderRadius: 100,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
};

const BUTTON_ICON: ViewStyle = {
  position: 'absolute',
  left: spacing[6],
};

const BUTTON_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  width: '100%',
  color: color.text,
  marginLeft: '40%',
  textAlign: 'left',
};

export const BUTTON_CONTAINER: ViewStyle = {
  width: 305,
  marginVertical: spacing[4],
};

const TEXT_SEPERATOR: TextStyle = {
  fontSize: 15,
  marginVertical: spacing[2],
};

const COPYRIGHT_TEXT: TextStyle = {
  paddingBottom: spacing[2],
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
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<GoogleIcon style={BUTTON_ICON} />}
      onPress={() => handlePress()}
    />
  );
};

const FacebookSignIn = () => {
  const handlePress = async () => Reactotron.log!('Press');

  return (
    <Button
      title="Log in with Facebook"
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<Facebook style={BUTTON_ICON} />}
      onPress={() => handlePress()}
    />
  );
};

const EmailSignIn = ({ onPressEvent }: { onPressEvent: () => void }) => (
  <Button
    title="Log in with Email"
    raised
    buttonStyle={PILL_BUTTON}
    titleStyle={BUTTON_TITLE}
    containerStyle={BUTTON_CONTAINER}
    icon={<Gmail style={BUTTON_ICON} />}
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
