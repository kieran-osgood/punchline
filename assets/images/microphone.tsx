import * as React from 'react';
import Svg, { G, Path, Ellipse, Defs } from 'react-native-svg';
import { SVGProps } from 'assets/images/facebook';

function Microphone(props: SVGProps) {
  return (
    <Svg viewBox="0 0 612 815" fill="none" {...props}>
      <G>
        <Path
          d="M108.5 450c-189.984 154.348 307.677 344.647-25 407.5"
          stroke="#212121"
          strokeWidth={8}
        />
      </G>
      <G>
        <Path
          d="M446.146 313.53L299.204 141.89 34.064 414.413l99.32 116.015L446.146 313.53z"
          fill="#000"
          stroke="#000"
          strokeWidth={2.197}
        />
        <G opacity={0.5}>
          <G>
            <Ellipse
              cx={423.97}
              cy={185.303}
              rx={130.387}
              ry={130.385}
              transform="rotate(49.035 423.97 185.303)"
              fill="#000"
            />
          </G>
          <Path
            d="M509.124 283.381c-54.166 47.028-136.202 41.242-183.231-12.925-47.029-54.167-41.243-136.202 12.923-183.231 54.166-47.029 136.202-41.242 183.231 12.925 47.029 54.167 41.244 136.202-12.923 183.231z"
            stroke="#000"
          />
        </G>
      </G>
      <Defs />
    </Svg>
  );
}

export default Microphone;
