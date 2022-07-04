import * as React from "react"
import { ScrollView, ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"

export interface StoryProps {
  children?: React.ReactNode
}

const ROOT: ViewStyle = { flex: 1 }

export function Story(props: StoryProps) {
  return (
    <View style={ROOT}>
      <ScrollView>{props.children}</ScrollView>
    </View>
  )
}
