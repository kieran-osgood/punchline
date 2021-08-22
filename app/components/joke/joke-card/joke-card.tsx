/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import { JokeModelType } from "app/graphql"
import * as React from "react"
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { Text } from "react-native-ui-lib"
import { color, spacing } from "theme"

const { width } = Dimensions.get("window")
export const α = Math.PI / 12

interface CardProps {
  joke: JokeModelType
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
  scale: Animated.SharedValue<number>
  onTop: boolean
}

const JokeCard = ({ joke, translateX, translateY, onTop, scale }: CardProps) => {
  const { body } = joke
  const x = useDerivedValue(() => (onTop ? translateX.value : 0))
  const container = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${interpolate(
          x.value,
          [-width / 2, 0, width / 2],
          [α, 0, -α],
          Extrapolate.CLAMP,
        )}rad`,
      },
      { scale: onTop ? 1 : scale.value },
    ],
  }))

  const color = React.useMemo(() => randomColor(), [])
  // onTop && console.log(body)
  return (
    <Animated.View style={[StyleSheet.absoluteFill, container]}>
      <View style={styles.overlay}>
        <View style={[CONTAINER, { backgroundColor: color.background }]}>
          <ScrollView showsVerticalScrollIndicator>
            <Text text60BO color={color.text}>
              {body}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Animated.View>
  )
}

export default JokeCard

const colors = [
  { background: "hsl(43, 100%, 54%)", text: color.palette.black },
  { background: "hsl(337, 62%, 65%)", text: color.palette.black },
  { background: "hsl(213, 100%, 50%)", text: color.line },
  { background: "hsl(268, 100%, 54%)", text: color.line },
  { background: "hsl(336, 100%, 45%)", text: color.line },
  { background: "hsl(234, 89%, 60%)", text: color.line },
]

const randomColor = (): typeof colors[0] => colors[Math.floor(colors.length * Math.random())]

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    height: undefined,
    width: undefined,
  },
  like: {
    borderColor: "#6ee3b4",
    borderRadius: 5,
    borderWidth: 4,
    padding: 8,
  },
  likeLabel: {
    color: "#6ee3b4",
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    color: "black",
    fontSize: 32,
  },
  nope: {
    borderColor: "#ec5288",
    borderRadius: 5,
    borderWidth: 4,
    padding: 8,
  },
  nopeLabel: {
    color: "#ec5288",
    fontSize: 32,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
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

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  padding: spacing[3],
  borderRadius: spacing[3],
  shadowColor: "#000000",
  flex: 1,
  position: "relative",
  ...CARD_SHADOW,
}
