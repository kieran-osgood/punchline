import Punchline from 'assets/images/punchline';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
  width?: number;
}

const AppLogo = ({ style = {}, width = 200 }: Props) => {
  return (
    <View style={{ ...CONTAINER, ...style }}>
      <Punchline width={width} />
    </View>
  );
};

export default AppLogo;

const CONTAINER: ViewStyle = {
  opacity: 0.75,
};
