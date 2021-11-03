import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { SVGProps } from "app/types"

type LaughingEmojiProps = {
  scale?:number
} & SVGProps
export function LaughingEmoji(props: LaughingEmojiProps) {
  const { scale = 0 } = props

  const width = scale <= 0 ? undefined : scale * 48
  const height = scale <= 0 ? undefined : scale * 48
  return (
    <Svg viewBox="4.1 7.4 55 44" fill="none" {...props} {...{ width, height }}>
      <Path
        d="M31.5 52.369c11.414 0 20.667-9.253 20.667-20.667 0-11.414-9.253-20.666-20.667-20.666-11.414 0-20.667 9.252-20.667 20.666S20.086 52.37 31.5 52.37z"
        fill="#FCEA2B"
      />
      <Path
        d="M44.068 36.559a9.949 9.949 0 01-.75 3.866c-10.755 2.61-21.897.293-23.671-.112a9.845 9.845 0 01-.715-3.754h.095s12.744 3.091 24.877.06l.164-.06z"
        fill="#fff"
      />
      <Path
        d="M43.319 40.425c-1.542 3.677-5.468 6.226-11.789 6.226-6.38 0-10.359-2.609-11.883-6.338 1.774.405 12.916 2.721 23.672.112z"
        fill="#EA5A47"
      />
      <Path
        d="M57.123 41.465a3.653 3.653 0 01-5.167.001c-2.56-2.559-2.589-7.716-2.589-7.768.2.012 5.21.054 7.757 2.6a3.652 3.652 0 010 5.167zM5.873 41.466a3.652 3.652 0 01-.001-5.168c2.559-2.559 7.716-2.588 7.768-2.588-.012.199-.054 5.21-2.6 7.756a3.653 3.653 0 01-5.167 0z"
        fill="#92D3F5"
      />
      <Path
        d="M51.175 29.412a19.808 19.808 0 00-39.304-.362c-.014.092-.034.27-.046.362M15.297 43.094A20.262 20.262 0 0031.5 51.508a20.101 20.101 0 0016.152-8.342"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.32 24.986a5.43 5.43 0 012.92-2.584 5.428 5.428 0 013.901-.362M44.68 24.986a6.191 6.191 0 00-6.811-2.954M44.068 36.559a9.949 9.949 0 01-.75 3.866c-10.755 2.61-21.897.293-23.671-.112a9.845 9.845 0 01-.715-3.754h.095s12.744 3.091 24.877.06l.164-.06z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M43.319 40.425c-1.542 3.677-5.468 6.226-11.789 6.226-6.38 0-10.359-2.609-11.883-6.338 1.774.405 12.916 2.721 23.672.112z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M57.123 41.465a3.653 3.653 0 01-5.167.001c-2.56-2.559-2.589-7.716-2.589-7.768.2.012 5.21.054 7.757 2.6a3.652 3.652 0 010 5.167v0zM5.873 41.466a3.652 3.652 0 01-.001-5.168c2.559-2.559 7.716-2.588 7.768-2.588-.012.199-.054 5.21-2.6 7.756a3.653 3.653 0 01-5.167 0v0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M27.792 30.983a4.07 4.07 0 00-7.438 0M42.646 30.983a4.07 4.07 0 00-7.438 0"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}