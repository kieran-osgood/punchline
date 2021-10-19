import { Platform, TextStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"

const fontFamily = (bold: boolean): TextStyle => ({
  fontFamily: Platform.select({
    ios: !bold ? "AvenirNextLTPro-Regular" : "AvenirNextLTPro-Bold", // The font family name
    android: !bold ? "AvenirNextLTPro-Regular" : "AvenirNextLTPro-Bold", // The file name
  }),
})

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    style: [fontFamily(props.bold), props.style],
  }
})

ThemeManager.setComponentTheme("Button", (props, context) => {
  const labelStyle =
    props.link && !props.linkColor ? { color: props.disabled ? "grey" : "#2211C9" } : {}
  return {
    labelStyle: [labelStyle, props.labelStyle],
  }
})

export * from "./color"
export * from "./spacing"
export * from "./timing"
export * from "./typography"
