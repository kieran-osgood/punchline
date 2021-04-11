import React from 'react'
import { View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import Punchline from 'assets/images/punchline'

interface AppLogoProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
}

/**
 * Describe your component here
 */
export const AppLogo = observer(function AppLogo(props: AppLogoProps) {
  const { style = {}, width = 200, height = 40 } = props

  return (
    <View style={{ ...CONTAINER, ...style }}>
      <Punchline width={width} height={height} />
    </View>
  )
})

const CONTAINER: ViewStyle = {
  opacity: 0.75,
}
