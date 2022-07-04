import { observer } from "mobx-react-lite"
import * as React from "react"
import { ImageStyle, ViewStyle } from "react-native"
import RNAutoHeightImage, { AutoHeightImageProps } from "react-native-auto-height-image"
import { View } from "react-native-ui-lib"

const CONTAINER: ViewStyle = {
  width: "100%",
  justifyContent: "center",
}

type CustomAutoHeightImageProps = {
  containerStyle?: ViewStyle
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ImageStyle
} & Omit<AutoHeightImageProps, "width">

/**
 * Describe your component here
 */
export const AutoHeightImage = observer(function AutoHeightImage(
  props: CustomAutoHeightImageProps,
) {
  const { style, containerStyle, ...rest } = props

  const [wrapperWidth, setWrapperWidth] = React.useState<number>(0)

  return (
    <View
      style={[CONTAINER, containerStyle]}
      onLayout={(event) => setWrapperWidth(event.nativeEvent.layout.width)}
    >
      <RNAutoHeightImage width={wrapperWidth} {...{ style }} {...rest} />
    </View>
  )
})
