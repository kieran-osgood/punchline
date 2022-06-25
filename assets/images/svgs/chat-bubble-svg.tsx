import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
import { SVGProps } from "app/types"

export function ChatBubbleSvg(props: SVGProps) {
  return (
    <Svg
      width={100}
      height={119}
      viewBox="0 0 136 119"
      fill="none"
      {...props}
      preserveAspectRatio="none"
    >
      <Rect width={136} height={100} rx={10} fill="#fff" />
      <Path
        d="M79 97h19.5c-10.658 6.658-16.215 10.73-25.5 18.5 5.596-6.019 7.788-9.744 6-18.5z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </Svg>
  )
}
