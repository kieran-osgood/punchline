import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';

import { AuthStack } from './app/auth/auth-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTabs from './app/main/main-tabs';

GoogleSignin.configure({
  webClientId:
    '681986405885-jq70bsbonfl2f9sl9aikc3687qklaf5m.apps.googleusercontent.com',
  iosClientId:
    '681986405885-oms8c4edds7s1cjlm550ss1sa8rqui7d.apps.googleusercontent.com',
});

export default function Routes() {
  return (
    <NavigationContainer>
      {true ? <AuthStack /> : <AppTabs />}
    </NavigationContainer>
  );
}
