import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface CategorySettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const CategorySetting = observer(function CategorySetting(props: CategorySettingProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
})
