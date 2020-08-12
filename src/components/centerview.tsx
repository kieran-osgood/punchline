import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: Record<string, string | number>;
}

export default function CenterView({ children, style }: Props) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
