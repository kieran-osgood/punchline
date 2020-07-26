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
