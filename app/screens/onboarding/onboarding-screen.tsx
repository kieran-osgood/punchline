import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { useRef } from "react"
import { Dimensions, StyleSheet, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { Text, View } from "react-native-ui-lib"
import {
  Dot,
  OnboardingCategorySetting,
  Screen,
  Slide as SlideComponent,
  SLIDE_HEIGHT,
  SubSlide,
} from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const { width } = Dimensions.get("window")

interface Slide {
  title: string
  subtitle: string
  description: string
  color: string
  Picture: () => JSX.Element | null
}

export const slides: Slide[] = [
  {
    title: "Categories",
    subtitle: "Block Categories",
    description:
      "Select the types of jokes you don't want to see in the settings page to optimise your experience!",
    color: "#BFEAF5",
    Picture: observer(function Picture() {
      return <OnboardingCategorySetting style={{ marginLeft: 75, paddingBottom: 75 }} />
    }),
  },
  {
    title: "Bookmarks",
    subtitle: "Save Your Favourites",
    description: "Save your favourites with the bookmark button to come back to at any time.",
    color: "#BEECC4",

    Picture: function Picture() {
      return (
        <View style={{ marginRight: 75 }}>
          <Text>a</Text>
        </View>
      )
    },
  },
  {
    title: "Share",
    subtitle: "Share Jokes",
    description: "Can't wait to see your friends to share? Share to social media!",
    color: "#FFE4D9",

    Picture: function Picture() {
      return (
        <View style={{ marginRight: 75 }}>
          <Text>a</Text>
        </View>
      )
    },
  },
]
export const assets = slides.map((slide) => slide.Picture)

export const OnboardingScreen = observer(function OnboardingScreen() {
  const store = useStores()
  const scroll = useRef<Animated.ScrollView>(null)
  const x = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x
    },
  })

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color),
    ),
  )
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }))
  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }))
  const currentIndex = useDerivedValue(() => x.value / width)
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }))

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <View style={styles.container}>
        <Animated.View style={[styles.slider, slider]}>
          {slides.map(({ Picture }, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const style = useAnimatedStyle(() => ({
              opacity: interpolate(
                x.value,
                [(index - 0.5) * width, index * width, (index + 0.5) * width],
                [0, 1, 0],
                Extrapolate.CLAMP,
              ),
            }))
            return (
              <Animated.View style={[styles.underlay, style]} key={index}>
                <Picture />
              </Animated.View>
            )
          })}
          <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {slides.map(({ title }, index) => (
              <SlideComponent key={index} right={!!(index % 2)} {...{ title }} />
            ))}
          </Animated.ScrollView>
        </Animated.View>
        <View style={styles.footer}>
          <Animated.View style={[StyleSheet.absoluteFill, background]} />
          <View style={styles.footerContent}>
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <Dot key={index} currentIndex={currentIndex} {...{ index }} />
              ))}
            </View>
            <Animated.View
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  flex: 1,
                  flexDirection: "row",
                  width: width * slides.length,
                },
                footerStyle,
              ]}
            >
              {slides.map(({ subtitle, description }, index) => {
                const last = index === slides.length - 1
                return (
                  <SubSlide
                    key={index}
                    onPress={() => {
                      if (last) {
                        store.userStore.completeOnboarding()
                      } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (scroll.current && scroll.current.scrollTo) {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          scroll.current.scrollTo({
                            x: width * (index + 1),
                            animated: true,
                          })
                        }
                      }
                    }}
                    {...{ subtitle, description, last }}
                  />
                )
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    backgroundColor: color.background,
    borderTopLeftRadius: 75,
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    flexDirection: "row",
    height: 75,
    justifyContent: "center",
  },
  slider: {
    borderBottomRightRadius: 75,
    height: SLIDE_HEIGHT,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    borderBottomRightRadius: 75,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
})
