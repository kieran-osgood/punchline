import { observer } from "mobx-react-lite"
import * as React from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"
import { color } from "theme"

const backgroundColor = "rgba(0,0,0,.6)"
export interface LoadingModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  indicatorStyle?: ViewStyle
  loading?: boolean
}

/**
 * Full screen modal with OS specific loading spinner.
 */
export const LoadingModal = observer(function LoadingModal(props: LoadingModalProps) {
  const { style, indicatorStyle = {}, loading = true } = props

  if (!loading) return null

  return (
    <View {...{ style, backgroundColor }} center flex-1>
      <ActivityIndicator
        size="large"
        color={color.success}
        style={indicatorStyle}
        accessibilityLabel="Loading Modal"
        accessibilityHint="Full screen loading animation whilst signing in"
      />
    </View>
  )
})
