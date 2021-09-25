import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function Success(props: SvgProps) {
  return (
    <Svg viewBox="0 0 96 95" fill="none" {...props} style={[props.style, { aspectRatio: 1 }]}>
      <Path
        d="M40.162 55.83L27.825 42.75a2 2 0 00-2.904-.007l-1.98 2.082a2 2 0 000 2.756L38.71 64.165a2 2 0 002.898 0l27.1-28.5a2 2 0 00.024-2.732l-1.894-2.06a2 2 0 00-2.922-.025L40.162 55.829z"
        fill="green"
        stroke="green"
        strokeWidth={2}
      />
      <Path
        d="M48 94c25.66 0 46.5-20.84 46.5-46.5S73.66 1 48 1 1.5 21.84 1.5 47.5 22.34 94 48 94zm0-86.05c21.728 0 39.55 17.708 39.55 39.55S69.727 87.05 48 87.05c-21.726 0-39.55-17.824-39.55-39.55C8.45 25.774 26.275 7.95 48 7.95z"
        fill="green"
        stroke="green"
        strokeWidth={2}
      />
    </Svg>
  )
}
