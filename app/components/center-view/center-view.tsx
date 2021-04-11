import * as React from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "theme"
import { SafeAreaView } from 'react-native-safe-area-context'

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  alignItems: 'center',
  justifyContent: 'center',
}

export interface CenterViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  children: React.ReactNode
}

/**
 * Describe your component here
 */
export const CenterView = observer(function CenterView(props: CenterViewProps) {
  const { children, style } = props

  return (
    <SafeAreaView style={{ ...CONTAINER, ...style }}>
      {children}
    </SafeAreaView>
  )
})
