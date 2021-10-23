import { TextStyle, ViewStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"
import { fontFamily, spacing } from "theme"

export const ICON_BUTTON: ViewStyle = {
  backgroundColor: "white",
  marginTop: spacing[4],
  justifyContent: "flex-start",
  paddingVertical: spacing[3],
  shadowColor: "grey",
}
export const ICON_BUTTON_LABEL: TextStyle = {
  ...fontFamily({ bold: true }),
  paddingLeft: spacing[4],
  color: ThemeManager.titleColor,
}
