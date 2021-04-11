import * as React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { Text } from "../"

export type CategorySettings = {
  id: string;
  name: string;
  isActive: boolean;
};

export interface SelectPillsProps {
  /**
   * An optional style override useful for padding & margin.
   */
   data: CategorySettings[];
   onValueChange?: (data: SelectPillsProps['data']) => void;}

/**
 * Describe your component here
 */
export const SelectPills = observer(function SelectPills(props: SelectPillsProps) {
  const { data, onValueChange } = props
  const [inputData, setInputData] = React.useState(data)

  React.useEffect(() => {
    setInputData(data)
  }, [data])

  const handlePress = (i: number) => {
    const _data = [...inputData]
    _data[i].isActive = !_data[i].isActive || false
    handleDataChange(_data)
  }

  const handleDataChange = (eData: SelectPillsProps['data']) => {
    setInputData(eData)
    if (onValueChange) {
      onValueChange(eData)
    }
  }

  const handleStyles = (isActive: boolean) =>
    isActive ? ACTIVE_SELECT : INACTIVE_SELECT

  return (
    <View style={CONTAINER}>
      {inputData.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            activeOpacity={0.9}
            style={{ ...handleStyles(!!item.isActive), ...SELECT }}>
            <Text style={{ ...handleStyles(!!item.isActive) }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
})

const ACTIVE_SELECT: ViewStyle = {
  backgroundColor: color.success,
}

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const INACTIVE_SELECT: ViewStyle = {
  backgroundColor: color.primaryDarker,
}

const SELECT: ViewStyle = {
  borderColor: 'transparent',
  borderRadius: 15,
  borderStyle: 'solid',
  borderWidth: 2,
  marginBottom: 8,
  marginRight: 8,
  marginTop: 8,
  padding: 8,
}
