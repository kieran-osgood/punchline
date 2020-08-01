import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function CenterView({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
