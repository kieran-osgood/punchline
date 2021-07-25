import * as React from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { color, spacing } from "theme"
import { Text } from "../"

const { width } = Dimensions.get("screen")

export interface CardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  body: string
  index: number
  id: number
}

/**
 * Describe your component here
 */
export const Card = React.forwardRef(function Card(
  props: CardProps,
  ref: React.LegacyRef<Animated.View>,
) {
  const { id, index, style, body } = props
  const translation = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translation.x.value },
        { translateY: -translation.y.value },
        {
          rotateZ:
            interpolate(
              translation.x.value,
              [-width / 2, width / 2],
              [15, -15],
              Extrapolate.CLAMP,
            ) + "deg",
        },
      ],
    }
  })
  const onPress = () => {
    translation.x.value = withTiming(width * 1.2)
    translation.y.value = withTiming(150)
  }
  return (
    <Animated.View style={animatedStyles} ref={ref}>
      {/* <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyles]} ref={ref}> */}
      <View style={[CONTAINER(index), style]}>
        <View style={{ flexDirection: "row" }}>
          <Text>
            id: {id} index: {index}
          </Text>
          {/* <Text style={TEXT(index)} text={body} bold /> */}
        </View>
      </View>
    </Animated.View>
  )
})
const colors = [
  { background: "hsl(43, 100%, 54%)", text: color.palette.black },
  { background: "hsl(337, 62%, 65%)", text: color.palette.black },
  { background: "hsl(213, 100%, 50%)", text: color.line },
  { background: "hsl(268, 100%, 54%)", text: color.line },
  { background: "hsl(336, 100%, 45%)", text: color.line },
  { background: "hsl(234, 89%, 60%)", text: color.line },
]

const CONTAINER = (index: number): ViewStyle => ({
  justifyContent: "center",
  backgroundColor: colors[index].background,
  padding: spacing[3],
  borderRadius: spacing[3],
  shadowColor: "#000000",
  flex: 1,
  ...CARD_SHADOW,
})
export const CARD_SHADOW = {
  shadowOffset: {
    width: spacing[1],
    height: spacing[1],
  },
  shadowOpacity: 0.25,
  shadowRadius: spacing[1],
  marginBottom: spacing[2],
}
const TEXT = (index: number): TextStyle => ({
  color: colors[index].text,
  fontSize: 18,
})
