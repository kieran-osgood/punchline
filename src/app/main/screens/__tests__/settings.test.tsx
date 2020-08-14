import { View } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Settings from '../settings';

test('should render the settings page', () => {
  render(
    <View>
      <Settings />
    </View>,
  );
});
