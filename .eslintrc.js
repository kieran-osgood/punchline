module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:jest-dom/recommended',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest-dom', 'jest'],
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'react-native/no-inline-styles': 'off',
    curly: 'off',
  },
};
