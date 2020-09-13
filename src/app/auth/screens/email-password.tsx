import React, { useState, useRef } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Reactotron from 'reactotron-react-native';

import { emailRegex } from 'src/utils';
import { color, spacing } from 'theme/index';
import { pillButton, buttonContainer } from 'auth/screens/login-choices';

import CenterView from 'components/centerview';
import Text from 'components/text';

export default function EmailPassword() {
  const emailInput = useRef(null);
  const [email, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [emailHasBeenTouched, setEmailHasBeenTouched] = useState(false);
  const [passwordHasBeenTouched, setPasswordHasBeenTouched] = useState(false);
  // Only test regex if the field has been touched (e.g. not on pageload)
  const emailIsOk = emailHasBeenTouched
    ? emailRegex.test(email)
      ? true
      : false
    : true;
  const passwordIsOk = passwordHasBeenTouched
    ? password.length >= 6
      ? true
      : false
    : true;
  const login = () => {
    auth()
      // .createUserWithEmailAndPassword(email, password)
      .signInWithEmailAndPassword(email, password)
      // .then((userCredential) => createUserSettings(userCredential))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Reactotron.log!('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Reactotron.log!('That email address is invalid!');
        }
        Reactotron.log!(error);
      });
  };

  return (
    <CenterView style={container}>
      <Input
        ref={emailInput}
        style={input}
        onChangeText={(text) => onChangeUsername(text)}
        value={email}
        placeholder="email@example.com"
        leftIcon={
          <Icon name="ios-mail" size={20} color="black" style={inputIcon} />
        }
        onFocus={() => setEmailHasBeenTouched(true)}
        errorStyle={inputError}
        errorMessage={emailIsOk ? '' : 'Enter a valid email'}
        label="Email Address"
      />
      <Input
        style={input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="********"
        leftIcon={
          <Icon name="md-key" size={20} color="black" style={inputIcon} />
        }
        onFocus={() => setPasswordHasBeenTouched(true)}
        errorStyle={inputError}
        errorMessage={passwordIsOk ? '' : 'Minimum length 6'}
        label="Password"
        secureTextEntry={true}
      />

      <Button
        buttonStyle={pillButton}
        titleStyle={{ color: color.text }}
        containerStyle={buttonContainer}
        onPress={login}
        title="Login"
        disabled={!(email.length > 0 && emailIsOk && password.length > 5)}
      />
      <Text text="Don't have an account yet?" style={text} />
      <Button title="Register" type="clear" />
    </CenterView>
  );
}

const container: ViewStyle = {
  paddingHorizontal: spacing[6],
};
const input: ViewStyle = {
  height: 40,
  width: 100,
  borderColor: 'transparent',
  borderWidth: 1,
};
const inputError: TextStyle = {
  color: color.error,
};
const inputIcon: ViewStyle = {
  paddingRight: spacing[2],
};
const text: TextStyle = {
  color: color.text,
  marginTop: spacing[4],
};
