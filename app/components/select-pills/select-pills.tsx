import { observer } from "mobx-react-lite"
import * as React from "react"
import { Pressable, ViewStyle } from "react-native"
import { Text, View, TouchableOpacity } from "react-native-ui-lib"
import { color } from "theme"

export type CategorySettings = {
  id: string
  name: string
  isActive: boolean
}

export const getAccessibilityHint = (item: CategorySettings) =>
  `Press to ${item.isActive ? "Enable" : "Disable"} ${item.name} Category`

export interface SelectPillsProps {
  data: CategorySettings[]
  onValueChange: (data: CategorySettings) => void
  accessibilityLabel?: string
}

/**
 * Describe your component here
 */
export const SelectPills = observer(function SelectPills(props: SelectPillsProps) {
  const { data, onValueChange, accessibilityLabel = "List of selectable items" } = props
  const activeStyle = (isActive: boolean) => (isActive ? ACTIVE_SELECT : INACTIVE_SELECT)
  return (
    <View style={CONTAINER} {...{ accessibilityLabel }}>
      {data.map((item, idx) => {
        const style = activeStyle(item.isActive)
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => onValueChange({ ...item, isActive: !item.isActive })}
            style={{ ...style, ...SELECT }}
            accessibilityLabel="category button"
            accessibilityHint={getAccessibilityHint(item)}
          >
            <Text {...{ style }}>{item.name}</Text>
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
  flexDirection: "row",
  flexWrap: "wrap",
}

const INACTIVE_SELECT: ViewStyle = {
  backgroundColor: color.primaryDarker,
}

const SELECT: ViewStyle = {
  borderColor: "transparent",
  borderRadius: 15,
  borderStyle: "solid",
  borderWidth: 2,
  marginBottom: 8,
  marginRight: 8,
  marginTop: 8,
  padding: 8,
}
