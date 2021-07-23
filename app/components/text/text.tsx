import { observer } from "mobx-react-lite"
import { flatten, mergeAll } from "ramda"
import * as React from "react"
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text as TextEl,
  TextProps as TextElProps,
  TextStyle,
} from "react-native"
import { color } from "../../theme"
// eslint-disable-next-line camelcase
// import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat"

export interface TextProps extends TextElProps {
  /**
   * An optional style override useful for padding & margin.
   */
  children?: React.ReactNode
  text?: string
  style?: TextStyle
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  bold?: boolean
}

/**
 * Describe your component here
 */
export const Text = observer(function Text(props: TextProps) {
  const {
    style,
    children = "",
    text = "",
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
    bold = false,
    ...rest
  } = props
  // const [loaded] = useFonts({
  // Montserrat_400Regular,
  // })

  const headingStyles = () => {
    let headingStyle: TextStyle = styles.base
    if (h1) headingStyle = styles.h1
    if (h2) headingStyle = styles.h2
    if (h3) headingStyle = styles.h3
    if (h4) headingStyle = styles.h4
    return headingStyle
  }
  // if (!loaded) return null
  const STYLE = mergeAll(
    flatten([
      {
        ...styles.base,
        ...headingStyles(),
        ...(style as Record<string, unknown>),
        // fontFamily: "Montserrat-Regular",
      },
    ]),
  )

  return (
    <TextEl {...rest} style={[STYLE, fontFamily(bold)]}>
      {children || text}
    </TextEl>
  )
})
// Use this to scale fonts
// https://medium.com/react-native-training/scaling-react-native-apps-for-tablets-211de8399cf1
const { width } = Dimensions.get("screen")
const scale = (fs: number) => fs * (width * 0.0025)
const styles = StyleSheet.create({
  base: {
    color: color.text,
    fontSize: scale(16),
    width: "100%",
  },
  h1: { fontSize: scale(40) },
  h2: { fontSize: scale(34) },
  h3: { fontSize: scale(28) },
  h4: { fontSize: scale(22) },
})

const fontFamily = (bold: boolean): TextStyle => ({
  fontFamily: Platform.select({
    ios: !bold ? "Montserrat" : "Montserrat-Bold", // The font family name
    android: !bold ? "Montserrat-Regular" : "Montserrat-Bold", // The file name
  }),
})
