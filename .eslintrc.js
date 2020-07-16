module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:jest-dom/recommended',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest-dom', 'jest'],
};
