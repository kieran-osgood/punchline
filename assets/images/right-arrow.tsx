import * as React from "react"
import { ViewStyle } from "react-native"
import Svg, { Path, SvgProps } from "react-native-svg"
import { ThemeManager } from "react-native-ui-lib"

const SIZE = 20

function RightArrow(props: SvgProps) {
  return (
    <Svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 20 20"
      color={ThemeManager.primaryColor}
      style={[STYLE, props.style]}
      {...props}
    >
      <Path d="M6 15l5-5-5-5 1-2 7 7-7 7z" fill="currentColor" />
    </Svg>
  )
}

export default RightArrow

const STYLE: ViewStyle = {
  aspectRatio: 1,
}
