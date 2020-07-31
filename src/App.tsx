import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/home';
import Settings from './pages/settings';
import Login from './pages/login';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

GoogleSignin.configure({
  webClientId:
    '681986405885-jq70bsbonfl2f9sl9aikc3687qklaf5m.apps.googleusercontent.com',
  iosClientId:
    '681986405885-oms8c4edds7s1cjlm550ss1sa8rqui7d.apps.googleusercontent.com',
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
        {/* <Tab.Screen name="Account" component={Account} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
