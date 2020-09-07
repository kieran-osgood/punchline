import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ThemeProvider } from 'react-native-elements';

import { AuthStack } from './app/auth/auth-stack';
import MainTabs from './app/main/main-tabs';

GoogleSignin.configure({
  webClientId:
    // '681986405885-eb59nigfp7jejgk8cn02dqor9jm2sqft.apps.googleusercontent.com',
    '681986405885-dhai19n3c3kai1ad2i5l6u57ot14uorq.apps.googleusercontent.com',
  iosClientId:
    '681986405885-oms8c4edds7s1cjlm550ss1sa8rqui7d.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    let unsubscribe = auth().onAuthStateChanged((userState) => {
      setUser(userState);
    });
    return () => unsubscribe();
  });

  return (
    <ThemeProvider>
      <NavigationContainer>
        {!user ? <AuthStack /> : <MainTabs />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
