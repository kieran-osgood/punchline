import React from 'react';
import { ViewStyle } from 'react-native';

import { spacing } from 'theme';

import CenterView from 'components/centerview';
import Text from 'components/text';

const HistoryScreen = () => {
  return (
    <CenterView style={CONTAINER}>
      <Text text="test" />
    </CenterView>
  );
};

export default HistoryScreen;

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
};
