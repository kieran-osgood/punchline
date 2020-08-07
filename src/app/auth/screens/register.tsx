import React from 'react';
import { Button, Text } from 'react-native';

import { AuthNavigationProps } from 'auth/auth-param-list';
import CenterView from 'components/centerview';

export default function Register({
  navigation,
  route,
}: AuthNavigationProps<'Register'>) {
  return (
    <CenterView>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate('Login');
          // navigation.goBack()
        }}
      />
    </CenterView>
  );
}
