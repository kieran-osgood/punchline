import * as React from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { mergeAll, flatten } from "ramda"
import { color } from "theme"
import { CenterView } from "../center-view/center-view"

const CONTAINER: ViewStyle = {
  backgroundColor: "rgba(0,0,0,.6)",
}

export interface LoadingModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  indicatorStyle?: ViewStyle
}

/**
 * Full screen modal with OS specific loading spinner.
 */
export const LoadingModal = observer(function LoadingModal(props: LoadingModalProps) {
  const { style, indicatorStyle = {} } = props
  const STYLE = mergeAll(flatten([{ ...style, ...CONTAINER }]))

  return (
    <CenterView style={STYLE}>
      <ActivityIndicator size={'large'} color={color.success} style={indicatorStyle}/>
    </CenterView>
  )
})
