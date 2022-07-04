import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { color } from "theme"

export const SIZE = 16

export function Blocked(props: { scale?: number } & SVGProps) {
  const { scale = 0 } = props

  const width = scale <= 0 ? undefined : scale * SIZE
  const height = scale <= 0 ? undefined : scale * SIZE

  return (
    <Svg viewBox="0 0 16 16" {...props} {...{ width, height }}>
      <Path
        d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-2 0c0-1.296-.41-2.496-1.11-3.477l-8.367 8.368A6 6 0 0014 8zm-2.524-4.89a6 6 0 00-8.367 8.367l8.368-8.368z"
        fill={color.error}
      />
    </Svg>
  )
}
