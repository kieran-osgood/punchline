import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Text as TextEl } from 'react-native-elements';

type Props = {
  children: React.ReactNode;
} & TextEl['props'];

const Text = (props: Props) => {
  const [loaded] = Font.useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TextEl {...props} style={{ ...styles.text, ...(props.style as {}) }}>
      {props.children}
    </TextEl>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
  },
});
