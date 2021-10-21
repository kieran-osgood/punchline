import JokeCard, { α } from "app/components/joke/joke-card/joke-card"
import { JokeModelType } from "app/graphql"
import React, { forwardRef, Ref, useImperativeHandle } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { snapPoint } from "react-native-redash"
import { View } from "react-native-ui-lib"

const { width, height } = Dimensions.get("window")

const A = Math.round(width * Math.cos(α) + height * Math.sin(α))

export interface SwipeHandler {
  swipeLeft: () => void
  swipeRight: () => void
}

interface SwiperProps {
  onSwipe?: (joke: JokeModelType) => void
  joke: JokeModelType
  isLoading: boolean
  onTop: boolean
}

const swipe = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  cb?: () => void,
) => {
  "worklet"
  translateX.value = withSpring(
    dest,
    {
      velocity,
      overshootClamping: dest !== 0,
      restSpeedThreshold: dest === 0 ? 0.01 : 100,
      restDisplacementThreshold: dest === 0 ? 0.01 : 100,
    },
    () => {
      if (dest !== 0 && typeof cb === "function") {
        runOnJS(() => setTimeout(cb, 600))()
      }
    },
  )
}

const SwiperJokeCard = ({ joke, onTop, isLoading }: SwiperProps, ref: Ref<SwipeHandler>) => {
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

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      if (onTop) swipe(translateX, -A, 2)
    },
    swipeRight: () => {
      if (onTop) swipe(translateX, A, 2)
    },
  }))

  if (joke.viewed) return null

  return (
    <View style={StyleSheet.absoluteFill}>
      <JokeCard {...{ onTop, scale, translateX, translateY, joke, loading: isLoading }} />
    </View>
  )
}

export default forwardRef(SwiperJokeCard)

const snapPoints = [-A, 0, A]

type GestureSwiperProps = {
  onSwipe?: (joke: JokeModelType) => void
  joke: JokeModelType
  isLoading: boolean
  onTop: boolean
  scale: Animated.SharedValue<number>
}

export const GestureSwiperJokeCard = (
  { joke, onTop, isLoading, scale }: GestureSwiperProps,
  ref: Ref<SwipeHandler>,
) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      if (onTop) swipe(translateX, -A, 2)
    },
    swipeRight: () => {
      if (onTop) swipe(translateX, A, 2)
    },
  }))

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: ({ translationX, translationY }, { x, y }) => {
      translateX.value = x + translationX
      translateY.value = y + translationY
      scale.value = interpolate(
        translateX.value,
        [-width / 4, 0, width / 4],
        [1, 0.95, 1],
        Extrapolate.CLAMP,
      )
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints)
      swipe(translateX, dest, 5)
      translateY.value = withSpring(0, { velocity: velocityY })
    },
  })

  if (joke.viewed) return null

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <JokeCard {...{ onTop, scale, translateX, translateY, joke, loading: isLoading }} />
      </PanGestureHandler>
    </View>
  )
}
