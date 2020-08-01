jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn().mockImplementation(() => {
      return null;
    }),
  },
  GoogleSigninButton: jest.fn().mockReturnValue(null),
}));
