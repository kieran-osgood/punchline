import { JokeLength } from "app/graphql"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { color, spacing } from "../../theme"

export interface VerticalCheckboxesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  data: Array<{ label: string; value: JokeLength; isChecked: boolean }>
  onPress: (value: JokeLength, checked?: boolean) => void
}

/**
 * Describe your component here
 */
export const VerticalCheckboxes = observer(function VerticalCheckboxes(
  props: VerticalCheckboxesProps,
) {
  const { data, style, onPress } = props

  return (
    <View style={[CONTAINER, style]}>
      {data.map((checkbox) => (
        <BouncyCheckbox
          key={checkbox.value}
          size={30}
          fillColor={color.primary}
          unfillColor="transparent"
          text={checkbox.label}
          style={CHECKBOX}
          iconStyle={ICON}
          onPress={(isChecked?: boolean) => onPress(checkbox.value, isChecked)}
          textStyle={TEXT}
          isChecked={checkbox.isChecked}
        />
      ))}
    </View>
  )
})
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  paddingLeft: spacing[5],
}

const TEXT: TextStyle = {
  textDecorationLine: "none",
}
const CHECKBOX: ViewStyle = {
  marginBottom: 10,
}
const ICON: ViewStyle = {
  borderColor: color.primary,
}
