import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function Cross(props: SvgProps) {
  return (
    <Svg width={16} height={16} fill="none" {...props} viewBox="0 0 100 100">
      <Path
        d="M100 83.0333L66.9788 50.006L99.988 16.9848L83.0212 0L49.994 33.0212L16.9728 0L0 16.9848L33.0092 50.006L0 83.0273L16.9848 100L49.994 66.9788L83.0032 100L100 83.0333Z"
        fill="#000"
      />
    </Svg>
  )
}
