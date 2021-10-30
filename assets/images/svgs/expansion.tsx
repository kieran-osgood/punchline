import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"
import { SVGProps } from "app/types"

export function Expansion(props: { scale?: number } & SVGProps) {
  const { scale = 0 } = props

  const width = scale <= 0 ? undefined : scale * 30
  const height = scale <= 0 ? undefined : scale * 30

  return (
    <Svg viewBox="0 0 30 30" fill="none" {...props} {...{ width, height }}>
      <Circle cx={15.5} cy={14.5} r={14} fill="#fff" stroke="#E3DEDE" />
      <Path stroke="#000" d="M10 14.5h11M15.5 9v11" />
    </Svg>
  )
}
