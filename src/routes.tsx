import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ThemeProvider } from 'react-native-elements';
import codePush from 'react-native-code-push';

import { AuthStack } from './app/auth/auth-stack';
import MainTabs from './app/main/main-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CategoriesProvider } from 'components/categories-context';

GoogleSignin.configure({
  webClientId:
    '681986405885-dhai19n3c3kai1ad2i5l6u57ot14uorq.apps.googleusercontent.com',
  iosClientId:
    '681986405885-oms8c4edds7s1cjlm550ss1sa8rqui7d.apps.googleusercontent.com',
  offlineAccess: true,
});

const Routes = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    let unsubscribe = auth().onAuthStateChanged((userState) => {
      setUser(userState);
    });
    return () => unsubscribe();
  });

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <CategoriesProvider>
            {!user ? <AuthStack /> : <MainTabs />}
          </CategoriesProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const codePushOptions = {
  // Options - https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: true,
};

// Prevents 404 errors in DEBUG configuration due to no valid keys provided
export default __DEV__ ? Routes : codePush(codePushOptions)(Routes);
