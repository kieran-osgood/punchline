import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function Skip(props: SvgProps) {
  return (
    <Svg aria-hidden="true" viewBox="0 0 24 24" {...props} width={24} height={24}>
      <Path
        d="M22 3.25a1 1 0 10-2 0v2.729c-1.068-1.08-2.378-1.971-3.954-2.46a11.435 11.435 0 00-7.394.197c-2.364.88-4.604 2.664-5.779 4.807a1 1 0 001.754.961c.911-1.662 2.74-3.156 4.722-3.893a9.435 9.435 0 016.106-.16c1.474.456 2.697 1.39 3.682 2.569H15.75a1 1 0 100 2H21a1 1 0 001-1V3.25zM6 15a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm2 .5v3a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5z"
        fill="#000"
      />
    </Svg>
  )
}
