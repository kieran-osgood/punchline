const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: [
    // '@testing-library/jest-dom',
    '@testing-library/jest-native/extend-expect',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-firebase/(app|auth)|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svgMock.js',
  },
};
