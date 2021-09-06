import { TextStyle, ViewStyle } from "react-native"
import { ThemeManager } from "react-native-ui-lib"
import { spacing } from "theme"

export const ICON_BUTTON: ViewStyle = {
  backgroundColor: "white",
  marginTop: spacing[4],
  justifyContent: "flex-start",
}
export const ICON_BUTTON_LABEL: TextStyle = {
  paddingLeft: spacing[5],
  color: ThemeManager.titleColor,
}
