import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { ThemeManager } from "react-native-ui-lib"

export function Ellipsis(props: { scale?: number } & SVGProps) {
  const { scale = 1 } = props

  const width = scale <= 0 ? undefined : scale * 24
  const height = scale <= 0 ? undefined : scale * 24

  return (
    <Svg aria-hidden="true" viewBox="0 0 512 512" {...props} {...{ width, height }}>
      <Path
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
        fill={ThemeManager.titleColor}
      />
    </Svg>
  )
}
