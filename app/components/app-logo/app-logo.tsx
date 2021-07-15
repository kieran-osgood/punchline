import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Punchline } from "images"

interface AppLogoProps {
  style?: StyleProp<ViewStyle>
  width?: number
  height?: number
}

/**
 * Describe your component here
 */
export const AppLogo = observer(function AppLogo(props: AppLogoProps) {
  const { style = {}, width = 200, height = 40 } = props

  return (
    <View style={[CONTAINER, style]} testID="Logo">
      <Punchline width={width} height={height} />
    </View>
  )
})

const CONTAINER: ViewStyle = {
  opacity: 0.75,
}
