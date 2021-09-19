import { JokeLength } from "app/graphql"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { ThemeManager, View } from "react-native-ui-lib"
import { color } from "../../theme"

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
    <View centerV padding-s6>
      {data.map((checkbox) => (
        <BouncyCheckbox
          key={checkbox.value}
          size={30}
          fillColor={color.primary}
          unfillColor="transparent"
          text={checkbox.label}
          style={CHECKBOX}
          iconStyle={ICON}
          onPress={() => onPress(checkbox.value, !checkbox.isChecked)}
          textStyle={TEXT}
          isChecked={checkbox.isChecked}
          disableBuiltInState
        />
      ))}
    </View>
  )
})

const TEXT: TextStyle = {
  textDecorationLine: "none",
  fontFamily: "Montserrat",
  fontWeight: "300",
  color: ThemeManager.titleColor,
}
const CHECKBOX: ViewStyle = {
  marginBottom: 10,
}
const ICON: ViewStyle = {
  borderColor: color.primary,
}
