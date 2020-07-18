import '@testing-library/react-native';

jest.mock('@react-native-firebase/app', () => {
  return {
    getFirebaseRoot: jest.fn(),
  };
});
