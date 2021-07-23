import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Logout(props: { scale?: number } & SVGProps) {
  const { scale = 0 } = props

  const width = scale <= 0 ? undefined : scale * 24
  const height = scale <= 0 ? undefined : scale * 24

  return (
    <Svg aria-hidden="true" viewBox="0 0 24 24" {...props} {...{ width, height }}>
      <Path
        d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"
        fill="#626262"
      />
    </Svg>
  )
}
