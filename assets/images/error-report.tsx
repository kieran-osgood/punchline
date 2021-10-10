import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { color } from "theme"

export function ErrorReportIcon(props: SVGProps) {
  return (
    <Svg aria-hidden="true" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"
        fill={color.error}
      />
      <Circle cx={12} cy={16} r={1} fill={color.error} />
      <Path
        d="M12 7c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z"
        fill={color.error}
      />
    </Svg>
  )
}
