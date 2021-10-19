import { Platform } from "react-native"
import { ThemeManager } from "react-native-ui-lib"

const fonts = {
  ultraLight: {
    fontFamily: "AvenirNextLTPro-UltLt",
    fontWeight: Platform.select({ ios: "200", android: undefined }),
  },
  regular: {
    fontFamily: "AvenirNextLTPro-Regular",
    fontWeight: Platform.select({ ios: "400", android: undefined }),
  },
  bold: {
    fontFamily: "AvenirNextLTPro-Bold",
    fontWeight: Platform.select({ ios: "700", android: undefined }),
  },
}
const fontFamily = (light = false, bold = false) => {
  let fontWeight: keyof typeof fonts = "regular"

  if (light) fontWeight = "ultraLight"
  if (bold) fontWeight = "bold"

  return fonts[fontWeight]
}

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    style: [fontFamily(props.light, props.bold), props.style],
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
