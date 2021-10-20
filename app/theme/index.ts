import { ThemeManager } from "react-native-ui-lib"

const fonts = {
  ultraLight: {
    fontFamily: "AvenirNextLTPro-UltLt",
    fontWeight: "200",
  },
  regular: {
    fontFamily: "AvenirNextLTPro-Regular",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "AvenirNextLTPro-Bold",
    fontWeight: "700",
  },
} as const
export const fontFamily = (settings: { light?: boolean; bold?: boolean }) => {
  let fontWeight: keyof typeof fonts = "regular"

  if (settings.light) fontWeight = "ultraLight"
  if (settings.bold) fontWeight = "bold"

  return fonts[fontWeight]
}

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    style: [fontFamily({ light: props.light, bold: props.bold }), props.style],
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
