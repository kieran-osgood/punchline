import { View } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Home from '../home';

jest.useFakeTimers();

test('should render the home page', () => {
  render(
    <View>
      <Home />
    </View>,
  );
});
