/* eslint-disable curly */
import React from 'react';
import { Text as TextEl, StyleSheet, TextStyle } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

type Props = {
  children?: React.ReactNode;
  text?: string;
  style?: TextStyle;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
};

const Text = ({
  style,
  children = '',
  text = '',
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
}: Props) => {
  const [loaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!loaded) {
    return null;
  }
  const headingStyles = () => {
    let headingStyle: TextStyle = styles.base;
    if (h1) headingStyle = styles.h1;
    if (h2) headingStyle = styles.h2;
    if (h3) headingStyle = styles.h3;
    if (h4) headingStyle = styles.h4;
    return headingStyle;
  };
  return (
    <TextEl
      style={{
        fontFamily: 'Montserrat_400Regular',
        ...styles.base,
        ...headingStyles(),
        ...(style as {}),
      }}>
      {children || text}
    </TextEl>
  );
};

export default Text;

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
  h1: { fontSize: 40 },
  h2: { fontSize: 34 },
  h3: { fontSize: 28 },
  h4: { fontSize: 22 },
});
