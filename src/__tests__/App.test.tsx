import { View } from 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';
import App from '../App';

test('should add a todo', () => {
  render(
    <View>
      <App />
    </View>,
  );
});
