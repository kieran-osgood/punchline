import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-firebase/app', () => ({
  __esModule: true, // this property makes it work
  getFirebaseRoot: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  default: jest.fn(),
  namedExport: jest.fn(),
}));

//curried function fixes TypeError: (0 , _auth.default) is not a function
jest.mock('@react-native-firebase/auth', () => () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn().mockImplementation(() => {
      return null;
    }),
  },
  GoogleSigninButton: jest.fn().mockReturnValue(null),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});