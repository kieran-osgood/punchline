import React, { useState, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { emailRegex } from 'src/utils';
import CenterView from 'components/centerview';

export default function EmailPassword() {
  const [email, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const emailInput = useRef(null);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  // Only test regex if the field has been touched (e.g. not on pageload)
  const emailIsOk = hasBeenTouched
    ? emailRegex.test(email)
      ? true
      : false
    : true;

  const login = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      // .signInWithEmailAndPassword(email, password)
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
        console.log(error);
      });
  };

  return (
    <CenterView style={styles.container}>
      <Input
        ref={emailInput}
        style={styles.input}
        onChangeText={(text) => onChangeUsername(text)}
        value={email}
        placeholder="email@example.com"
        leftIcon={
          <Icon
            name="ios-mail"
            size={20}
            color="black"
            style={styles.inputIcon}
          />
        }
        onFocus={() => setHasBeenTouched(true)}
        errorStyle={styles.inputError}
        errorMessage={emailIsOk ? '' : 'Enter a valid email'}
        label="Email Address"
      />
      <Input
        style={styles.input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="********"
        leftIcon={
          <Icon
            name="md-key"
            size={20}
            color="black"
            style={styles.inputIcon}
          />
        }
        secureTextEntry={true}
        label="Password"
      />

      <Button
        onPress={login}
        title="Login"
        disabled={!(email.length > 0 && emailIsOk && password.length > 0)}
      />
    </CenterView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  inputError: {
    color: 'red',
  },
  inputIcon: {
    paddingRight: 8,
  },
});
