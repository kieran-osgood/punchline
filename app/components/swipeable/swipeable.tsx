import JokeCard, { α } from "app/components/joke-card/joke-card"
import { JokeModelType } from "app/graphql"
import React, { forwardRef, Ref, useImperativeHandle } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { snapPoint } from "react-native-redash"

const { width, height } = Dimensions.get("window")

const A = Math.round(width * Math.cos(α) + height * Math.sin(α))
const snapPoints = [-A, 0, A]

export interface SwipeHandler {
  swipeLeft: () => void
  swipeRight: () => void
}

interface SwiperProps {
  onSwipe?: (joke: JokeModelType) => void
  joke: JokeModelType
  scale: Animated.SharedValue<number>
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
        runOnJS(cb)()
      }
    },
  )
}

const Swiper = ({ onSwipe, joke, scale, onTop }: SwiperProps, ref: Ref<SwipeHandler>) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      swipe(translateX, -A, 5)
    },
    swipeRight: () => {
      swipe(translateX, A, 5)
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

  return (
    <PanGestureHandler>
      {/* to re-enable swiping use: <PanGestureHandler {...{onGestureEvent}}> */}
      <Animated.View style={StyleSheet.absoluteFill}>
        <JokeCard
          joke={joke}
          translateX={translateX}
          translateY={translateY}
          scale={scale}
          onTop={onTop}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}

export default forwardRef(Swiper)
