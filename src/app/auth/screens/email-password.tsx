import React, { useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Reactotron from 'reactotron-react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import crashlytics from '@react-native-firebase/crashlytics';

import { color, spacing } from 'theme/index';
import {
  PILL_BUTTON,
  BUTTON_CONTAINER,
  createUserSettings,
} from 'auth/screens/login-choices';

import CenterView from 'components/centerview';
import Text from 'components/text';

interface Inputs {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid Email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required (minimum 6 characters).'),
});
export default function EmailPassword() {
  const { errors, handleSubmit, trigger, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const [returnError, setReturnError] = useState('');
  const [touched, setTouched] = useState(0);

  const submit = ({ email, password }: Inputs) => {
    auth()
      // .createUserWithEmailAndPassword(email, password)
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => createUserSettings(userCredential))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setReturnError('That email address is already in use!');
          Reactotron.log!('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          setReturnError('That email address is invalid!');
          crashlytics().log('That email address is invalid!');
        }
        crashlytics().log(error);
        Reactotron.log!(error);
      });
  };

  return (
    <CenterView style={container}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={(props) => (
          <Input
            {...props}
            style={input}
            onTouchStart={() => trigger('email')}
            onFocus={() => setTouched(touched + 1)}
            placeholder="email@example.com"
            leftIcon={
              <Icon name="ios-mail" size={20} color="black" style={inputIcon} />
            }
            errorStyle={inputError}
            errorMessage={errors.email?.message}
            label="Email Address"
            onChangeText={(text: string) => {
              props.onChange(text);
              trigger('email');
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={(props) => (
          <Input
            {...props}
            onTouchStart={() => trigger('password')}
            onFocus={() => setTouched(touched + 1)}
            style={input}
            placeholder="********"
            leftIcon={
              <Icon name="md-key" size={20} color="black" style={inputIcon} />
            }
            errorStyle={inputError}
            errorMessage={errors.password?.message}
            label="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              props.onChange(text);
              trigger('password');
            }}
          />
        )}
      />

      {returnError ? <Text style={inputError}>{returnError}</Text> : null}
      <Button
        buttonStyle={PILL_BUTTON}
        titleStyle={{ color: color.text }}
        containerStyle={BUTTON_CONTAINER}
        onPress={handleSubmit(submit)}
        title="Login"
        disabled={touched < 2 || !!errors.email || !!errors.password}
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
