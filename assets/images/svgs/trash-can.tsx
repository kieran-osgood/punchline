import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function TrashCan(props: { scale?: number; fill: string } & SVGProps) {
  const { scale = 0, fill = "#626262" } = props

  const width = scale <= 0 ? undefined : scale * 24
  const height = scale <= 0 ? undefined : scale * 24

  return (
    <Svg {...props} {...{ width, height }} aria-hidden="true" viewBox="0 0 24 24">
      <Path
        d="M17 22H7a2 2 0 01-2-2V7H3V5h4V4a2 2 0 012-2h6a2 2 0 012 2v1h4v2h-2v13a2 2 0 01-2 2zM7 7v13h10V7H7zm2-3v1h6V4H9zm6 14h-2V9h2v9zm-4 0H9V9h2v9z"
        fill={fill}
      />
    </Svg>
  )
}
