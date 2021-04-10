import * as React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'
import { SVGProps } from 'app/types'

function CryingEmoji({ width = 84, height = 84, ...rest }: SVGProps) {
  return (
    <Svg width={width} height={height} viewBox="12 12 48 48" {...rest}>
      <G
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}>
        <Path d="M52 52.38c.877-1.631 1-5.38 1-7.38 0-4-4-11-4-11M44 36s3 6.728 3 10c0 3.065-1 8-1 10M20 52.4c-.877-1.631-1-5.4-1-7.4 0-4 4-11 4-11M28 36s-3 6.728-3 10c0 3.065 1 8 1 10" />
      </G>
      <Path
        fill="#FCEA2B"
        d="M36.2 13.32c-12.57 0-22.8 10.23-22.8 22.8s10.23 22.8 22.8 22.8S59 48.69 59 36.12s-10.23-22.8-22.8-22.8z"
      />
      <Path
        fillRule="evenodd"
        d="M35.93 51.58c-2.461 0-4.742-2.368-4.742-4.987s2.444-4.66 4.905-4.66 4.701 2.205 4.701 4.823c0 2.619-2.403 4.823-4.864 4.823z"
      />
      <Path
        fill="#fff"
        d="M31.37 45.29c2.025 1.288 7.318 1.288 9.26 0L36 41.285z"
      />
      <Path
        fill="#92d3f5"
        d="M29.7 32.02c-5.762 9.541-3.86 14.27-3.696 23.98 0 1.803-5.146-2.412-6-4-2.17-5.92-.399-13.81 2.5-19.18 2.887-1.622 6.992-2.084 7.196-.803zM42.3 32.4c5.762 9.541 3.86 14.27 3.696 23.98 0 1.803 5.146-2.412 6-4 2.17-5.92.399-13.81-2.5-19.18-2.887-1.622-6.992-2.084-7.196-.803z"
      />
      <G fill="none" stroke="#000" strokeMiterlimit={10} strokeWidth={2}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M40.5 32.82c.413-.344 2.246-1.792 4.909-1.636 2.161.126 3.61 1.233 4.091 1.636M22.5 32.82c.413-.344 2.246-1.792 4.909-1.636 2.161.126 3.61 1.233 4.091 1.636"
        />
        <Circle cx={36} cy={36} r={23} />
        <Circle
          cx={36}
          cy={46.6}
          r={4.759}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default CryingEmoji
