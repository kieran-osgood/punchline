/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import CenterView from '../../../components/centerview';

export default function EmailPassword() {
  const [email, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  return (
    <CenterView>
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
    </CenterView>
  );
}
