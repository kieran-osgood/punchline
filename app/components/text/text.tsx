import * as React from "react"
import { observer } from "mobx-react-lite"
import { mergeAll, flatten } from "ramda"
import { color } from "../../theme"
import { Text as TextEl, StyleSheet, TextStyle } from "react-native"
// eslint-disable-next-line camelcase
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat"

export interface TextProps {
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
}

/**
 * Describe your component here
 */
export const Text = observer(function Text(props: TextProps) {
  const { style, children = "", text = "", h1 = false, h2 = false, h3 = false, h4 = false } = props
  const [loaded] = useFonts({
    Montserrat_400Regular,
  })

  const headingStyles = () => {
    let headingStyle: TextStyle = styles.base
    if (h1) headingStyle = styles.h1
    if (h2) headingStyle = styles.h2
    if (h3) headingStyle = styles.h3
    if (h4) headingStyle = styles.h4
    return headingStyle
  }
  if (!loaded) return null
  const STYLE = mergeAll(
    flatten([{
      fontFamily: "Montserrat_400Regular",
      ...styles.base,
      ...headingStyles(),
      ...(style as Record<string, unknown>),
    }]),
  )

  return (
    <TextEl style={STYLE}>
      {children || text}
    </TextEl>
  )
})

const styles = StyleSheet.create({
  base: {
    color: color.text,
    fontSize: 16,
  },
  h1: { fontSize: 40 },
  h2: { fontSize: 34 },
  h3: { fontSize: 28 },
  h4: { fontSize: 22 },
})