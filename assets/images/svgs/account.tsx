import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

// FIXME move all svgs to subdir
export function AccountIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      {...props}
    >
      <Path
        d="M9 9.5a4 4 0 110-8 4 4 0 010 8zM1 19.5v-1a6 6 0 016-6h4a6 6 0 016 6v1"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
