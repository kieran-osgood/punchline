import { Platform, TextStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"

const fontFamily = (bold: boolean): TextStyle => ({
  fontFamily: Platform.select({
    ios: !bold ? "Montserrat" : "Montserrat-Bold", // The font family name
    android: !bold ? "Montserrat-Regular" : "Montserrat-Bold", // The file name
  }),
})

ThemeManager.setComponentTheme("Text", (props, context) => {
  return {
    style: [fontFamily(props.bold), props.style],
  }
})
ThemeManager.setComponentTheme("Button", (props, context) => {
  return {
    labelStyle: [{ color: "#2211C9" }, props.labelStyle],
  }
})
// ThemeManager.setComponentTheme("Button", (props, context) => {
//   return {
// this will apply a different backgroundColor
// depends if the Button is an outline or not
//     backgroundColor: props.outline ? "black" : "green",
//   }
// })

export * from "./color"
export * from "./spacing"
export * from "./timing"
export * from "./typography"
