/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import { MotiTransitionProp } from "@motify/core"
import { Skeleton } from "@motify/skeleton"
import { JokeModel, JokeModelType } from "app/graphql"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, ScrollView, StyleSheet, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { Text, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

const { width } = Dimensions.get("window")
export const α = Math.PI / 12

interface JokeCardProps {
  joke: JokeModelType
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
  scale: Animated.SharedValue<number>
  onTop: boolean
  // loading?: Animated.SharedValue<number>
  loading?: boolean
}
export const skeletonColors = [
  "#D3D3D3",
  "#D3D3D3",
  "#D3D3D3",
  "#D3D3D3",
  "#fdfdfd",
  "#D3D3D3",
  "#D3D3D3",
  "#D3D3D3",
  "#D3D3D3",
]
export const transition: MotiTransitionProp = {}
export const colorMode = "light"

const JokeCard = ({
  joke,
  translateX,
  translateY,
  onTop,
  scale,
  loading: isLoading = false,
}: JokeCardProps) => {
  const { body } = joke
  const loadingAnimation = onTop && isLoading

  const loading = useDerivedValue(() => {
    return withTiming(isLoading ? 1 : 0)
  }, [isLoading])

  const x = useDerivedValue(() => (onTop ? translateX.value : 0))
  const container = useAnimatedStyle(() => {
    const rotate = `${interpolate(
      x.value,
      [-(width / 2), 0, width / 2],
      [-α, 0, α],
      Extrapolate.CLAMP,
    )}rad`

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate },
        { scale: withTiming(onTop ? 1 : scale.value) },
      ],
    }
  })

  const color = React.useMemo(() => randomColor(), [])

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    backgroundColor: loadingAnimation
      ? interpolateColor(loading.value, [1, 0], ["#fff", color.background])
      : color.background,
  }))
  const fadeout = useAnimatedStyle(
    () => ({
      opacity: loadingAnimation ? loading.value : 0,
      height: loadingAnimation ? loading.value : 0,
    }),
    [loadingAnimation],
  )
  const fadein = useAnimatedStyle(
    () => ({
      opacity: loadingAnimation ? interpolate(loading.value, [1, 0], [0, 1]) : 1,
    }),
    [loadingAnimation],
  )

  return (
    <Animated.View style={[StyleSheet.absoluteFill, container]}>
      <View style={styles.overlay}>
        <Animated.View style={[CONTAINER, animatedPlaceholderStyles]}>
          <ScrollView showsVerticalScrollIndicator>
            {/* TODO: investigate why this is not showing loading animation when empty or loading */}
            {loadingAnimation && (
              <View padding-s4>
                <Animated.View style={fadeout}>
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <React.Fragment key={idx}>
                        {[1, 2].map((y, yIdx) => {
                          return (
                            <React.Fragment key={yIdx}>
                              <Skeleton
                                {...{ colors: skeletonColors, colorMode, transition }}
                                width={y === 1 ? "100%" : "90%"}
                                height={20}
                              />
                              <View height={y * 5} />
                            </React.Fragment>
                          )
                        })}
                      </React.Fragment>
                    ))}
                </Animated.View>
              </View>
            )}
            <Animated.View style={[loadingAnimation ? fadein : {}, { padding: spacing[3] }]}>
              <Text text60BO color={color.text}>
                {body}
              </Text>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

export default JokeCard

const colors = [
  { background: "hsl(43, 100%, 100%)", text: color.palette.black },
  // { background: "hsl(43, 100%, 54%)", text: color.palette.black },
  // { background: "hsl(337, 62%, 65%)", text: color.palette.black },
  // { background: "hsl(213, 100%, 50%)", text: color.line },
  // { background: "hsl(268, 100%, 54%)", text: color.line },
  // { background: "hsl(336, 100%, 45%)", text: color.line },
  // { background: "hsl(234, 89%, 60%)", text: color.line },
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
  borderRadius: spacing[3],
  flex: 1,
  position: "relative",
  ...CARD_SHADOW,
}

export const LoadingJokeCard = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-width / 4, 0, width / 4],
      [1, 0.95, 1],
      Extrapolate.CLAMP,
    )
  }, [translateX.value])

  const joke = JokeModel.create({ id: "" })

  return <JokeCard onTop {...{ scale, translateX, translateY, joke }} loading />
}

export const JokeTitle = observer(({ loading = false }: { loading?: boolean }) => {
  const { apiStore } = useStores()
  if (loading) {
    return (
      <View style={HEADER} center width="100%">
        {[1, 2].map((x, idx) => {
          return (
            <React.Fragment key={idx}>
              <Skeleton
                {...{ colors: skeletonColors, colorMode, transition }}
                width={idx === 0 ? "25%" : "80%"}
                height={20 * x}
              />
              <View height={10} />
            </React.Fragment>
          )
        })}
      </View>
    )
  }

  return (
    <View style={HEADER}>
      <Text grey30 bold>
        {apiStore.jokeApi.topOfDeckJoke.categories?.[0].name}
      </Text>
      <Text text40 bold center marginH-s3 numberOfLines={3}>
        {apiStore.jokeApi.topOfDeckJoke.title}
      </Text>
    </View>
  )
})
const HEADER: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: heightPercentageToDP("15%"),
}
