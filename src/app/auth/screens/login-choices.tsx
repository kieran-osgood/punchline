import React from 'react';
import { Alert, TextStyle, ViewStyle } from 'react-native';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import crashlytics from '@react-native-firebase/crashlytics';

import { AuthNavigationProps } from 'auth/auth-param-list';

import { color, spacing } from 'theme/index';
import Text from 'components/text';
import CenterView from 'components/centerview';

import Facebook from 'assets/images/facebook';
import GoogleIcon from 'assets/images/google';
// import Gmail from 'assets/images/gmail';
import AppLogo from 'components/app-logo';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function LoginChoices({}: // navigation,
AuthNavigationProps<'LoginChoices'>) {
  return (
    <CenterView style={CONTAINER}>
      <AppLogo />

      <Text h1 text="Login" />
      <Text
        style={COPY}
        text="Login to bookmark your favourite jokes for later, and view your history!"
      />
      <CenterView style={BUTTONS_CONTAINER}>
        <GoogleSignIn />
        <FacebookSignIn />
        {/* <EmailSignIn
          onPressEvent={() => navigation.navigate('EmailPassword')}
        /> */}
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
const CONTAINER: ViewStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};
const COPY: TextStyle = {
  width: widthPercentageToDP('70'),
  textAlign: 'center',
};
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
  marginVertical: spacing[3],
};

const TEXT_SEPERATOR: TextStyle = {
  fontSize: 15,
  marginVertical: spacing[5],
};

const COPYRIGHT_TEXT: TextStyle = {
  paddingBottom: spacing[3],
};

const BUTTONS_CONTAINER: ViewStyle = {
  flex: 0,
};
export const GoogleSignIn = ({
  isAnonymousConversion = false,
  title = 'Log in with Google',
}: {
  isAnonymousConversion?: boolean;
  title?: string;
}) => {
  const handlePress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    if (isAnonymousConversion) {
      convertGoogle(idToken);
    } else {
      signInWithGoogle(idToken);
    }
  };

  const signInWithGoogle = async (idToken: string | null) => {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    createUserSettings(userCredential);
  };

  const convertGoogle = (idToken: string | null) => {
    if (idToken === null) {
      errorPopup();
    }

    const credential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .currentUser?.linkWithCredential(credential)
      .then(function () {
        successPopup();
      })
      .catch(function () {
        errorPopup();
      });
  };

  return (
    <Button
      title={title}
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<GoogleIcon style={BUTTON_ICON} />}
      onPress={() => handlePress()}
    />
  );
};

export const FacebookSignIn = ({
  isAnonymousConversion = false,
  title = 'Log in with Facebook',
}: {
  isAnonymousConversion?: boolean;
  title?: string;
}) => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      crashlytics().log('Something went wrong obtaining access token');
      return;
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    if (isAnonymousConversion) {
      convertFacebook(data.accessToken);
    } else {
      signInWithFacebook(facebookCredential);
    }
  }

  const signInWithFacebook = (
    facebookCredential: FirebaseAuthTypes.AuthCredential,
  ) => {
    auth()
      .signInWithCredential(facebookCredential)
      .catch(() => crashlytics().log('Error signin in with facebook'));
  };

  const convertFacebook = (accessToken: string | null) => {
    var credential = auth.FacebookAuthProvider.credential(accessToken);
    auth()
      .currentUser?.linkWithCredential(credential)
      .then(function () {
        successPopup();
      })
      .catch(function (error) {
        errorPopup();
        crashlytics().log(`Error upgrading anonymous account ${error}`);
      });
  };

  return (
    <Button
      title={title}
      buttonStyle={PILL_BUTTON}
      titleStyle={BUTTON_TITLE}
      containerStyle={BUTTON_CONTAINER}
      raised
      icon={<Facebook style={BUTTON_ICON} />}
      onPress={() => onFacebookButtonPress()}
    />
  );
};

// const EmailSignIn = ({ onPressEvent }: { onPressEvent: () => void }) => (
//   <Button
//     title="Log in with Email"
//     raised
//     buttonStyle={PILL_BUTTON}
//     titleStyle={BUTTON_TITLE}
//     containerStyle={BUTTON_CONTAINER}
//     icon={<Gmail style={BUTTON_ICON} />}
//     onPress={onPressEvent}
//   />
// );

const GuestSignIn = () => (
  <>
    <Button
      title="Continue as guest"
      type="clear"
      onPress={() => {
        auth()
          .signInAnonymously()
          .then((userCredential) => {
            createUserSettings(userCredential);
          })
          .catch((error) => {
            if (error.code === 'auth/operation-not-allowed') {
              crashlytics().log('Enable anonymous in your firebase console.');
            }
            crashlytics().log(error);
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
        .catch((error) =>
          crashlytics().log(`login-choices.tsx - createUserSettings: ${error}`),
        );
    }
  });
};

const successPopup = () => {
  Alert.alert(
    'Success',
    'Successfully linked your account, your bookmarks and history has been transferred to this account.',
    [
      {
        text: 'Ok',
      },
    ],
  );
};

const errorPopup = () => {
  Alert.alert(
    'Error',
    'Unable to link acccounts, please reload the app and try again or contact support.',
    [
      {
        text: 'Ok',
      },
    ],
  );
};
