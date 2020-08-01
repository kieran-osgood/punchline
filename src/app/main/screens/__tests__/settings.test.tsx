import { View } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import '../../../../../__mocks__/react-native-firebase'; // MUST come before <App /> import
import '../../../../../__mocks__/react-native-comunity'; // MUST come before <App /> import
import Settings from '../settings';

jest.useFakeTimers();

test('should render the settings page', () => {
  render(
    <View>
      <Settings />
    </View>,
  );
});
