import { SVGProps } from "app/types"
import * as React from "react"
import Svg, { Defs, Ellipse, G, Path } from "react-native-svg"

export function Punchline(props: SVGProps & { color: string }) {
  const { color = "#000", ...rest } = props
  return (
    <Svg viewBox="0 0 1135 290" {...rest}>
      <Path
        d="M66.85 77.5c10.617 0 19.833 1.75 27.65 5.25 7.933 3.5 14 8.517 18.2 15.05 4.2 6.534 6.3 14.292 6.3 23.275 0 8.867-2.1 16.625-6.3 23.275-4.2 6.534-10.267 11.55-18.2 15.05-7.817 3.5-17.033 5.25-27.65 5.25H39.2V200H16.45V77.5h50.4zm-1.05 67.9c9.917 0 17.442-2.1 22.575-6.3 5.133-4.2 7.7-10.208 7.7-18.025 0-7.816-2.567-13.825-7.7-18.025-5.133-4.2-12.658-6.3-22.575-6.3H39.2v48.65h26.6zm128.594 56.35c-16.917 0-30.1-4.725-39.55-14.175-9.45-9.566-14.175-23.216-14.175-40.95V77.5h22.75v68.25c0 24.034 10.383 36.05 31.15 36.05 20.65 0 30.975-12.016 30.975-36.05V77.5h22.4v69.125c0 17.734-4.725 31.384-14.175 40.95-9.334 9.45-22.459 14.175-39.375 14.175zM388.654 77.5V200h-18.725l-67.55-82.95V200h-22.575V77.5h18.725l67.55 82.95V77.5h22.575zm89.525 124.25c-12.366 0-23.566-2.683-33.6-8.05-9.916-5.483-17.733-13.008-23.45-22.575-5.6-9.566-8.4-20.358-8.4-32.375 0-12.016 2.859-22.808 8.575-32.375 5.717-9.566 13.534-17.033 23.45-22.4 10.034-5.483 21.234-8.225 33.6-8.225 10.034 0 19.192 1.75 27.475 5.25 8.284 3.5 15.284 8.575 21 15.225l-14.7 13.825c-8.866-9.566-19.775-14.35-32.725-14.35-8.4 0-15.925 1.867-22.575 5.6-6.65 3.617-11.841 8.692-15.575 15.225-3.733 6.534-5.6 13.942-5.6 22.225 0 8.284 1.867 15.692 5.6 22.225 3.734 6.534 8.925 11.667 15.575 15.4 6.65 3.617 14.175 5.425 22.575 5.425 12.95 0 23.859-4.841 32.725-14.525l14.7 14c-5.716 6.65-12.775 11.725-21.175 15.225-8.283 3.5-17.441 5.25-27.475 5.25zM657.478 77.5V200h-22.75v-52.5h-63.35V200h-22.75V77.5h22.75v50.575h63.35V77.5h22.75zm32.825 0h22.75v103.25h64.05V200h-86.8V77.5zm310.337 0V200h-18.723l-67.55-82.95V200h-22.575V77.5h18.725l67.55 82.95V77.5h22.573zm124.7 103.425V200h-91.87V77.5h89.42v19.075h-66.67v31.85h59.15v18.725h-59.15v33.775h69.12z"
        fill={color}
      />
      <G>
        <Path
          d="M839.857 205.011c-39.271 24.168 29.668 48.206-9.603 72.374"
          stroke={color}
          strokeWidth={8}
        />
      </G>
      <G>
        <Path
          d="M857.291 98.882l-48.036-.694c-5.295-.076-9.513 4.413-9.107 9.693l7.364 95.845a8.994 8.994 0 008.839 8.305l29.525.426a9.004 9.004 0 009.073-7.96l11.148-95.578c.617-5.294-3.476-9.96-8.806-10.037z"
          fill={color}
          stroke={color}
          strokeWidth={2.197}
        />
        <G opacity={0.5}>
          <G>
            <Ellipse
              cx={833.954}
              cy={78.555}
              rx={39.163}
              ry={39.162}
              transform="rotate(.428 833.954 78.555)"
              fill={color}
            />
          </G>
          <Path
            d="M872.615 78.844c-.159 21.352-17.598 38.532-38.95 38.372-21.352-.159-38.532-17.598-38.373-38.95.16-21.352 17.598-38.531 38.951-38.372 21.352.16 38.532 17.598 38.372 38.95z"
            stroke={color}
          />
        </G>
      </G>
      <Defs></Defs>
    </Svg>
  )
}
