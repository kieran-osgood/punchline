import 'react-native-gesture-handler/jestSetup';

jest.mock('@expo-google-fonts/montserrat', () => ({
  useFonts: jest.fn(() => [true]),
}));

jest.mock('@react-native-community/async-storage', () => ({
  useAsyncStorage: jest.fn(),
}));

//curried function fixes TypeError: (0 , _firestore.default) is not a function
jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn().mockReturnValue({
    doc: jest.fn('k0ZbGcuaLHTbH0aBZo8BktcnV883').mockReturnValue({
      update: jest.fn(),
      uid: 'k0ZbGcuaLHTbH0aBZo8BktcnV883',
      onSnapshot: jest.fn().mockReturnValue(jest.fn()),
    }),
    add: jest.fn().mockResolvedValue({
      id: 'k0ZbGcuaLHTbH0aBZo8BktcnV883',
    }),
  }),
}));

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
