import { useStores } from "app/models"
import { OnboardingBookmarks } from "assets/images/onboarding-bookmarks"
import { OnboardingUserPosts } from "assets/images/onboarding-user-posts"
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
import { View } from "react-native-ui-lib"
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
    subtitle: "Personalise your experience",
    description: "Filter out the types of jokes you don't like in the settings page.",
    color: "#BFEAF5",
    Picture: observer(function Picture() {
      return <OnboardingCategorySetting style={SLIDE_1} />
    }),
  },
  {
    title: "Bookmarks",
    subtitle: "Save the best for later!",
    description: "Save your favourites to share later from your history.",
    color: "#BEECC4",

    Picture: function Picture() {
      return <OnboardingBookmarks containerStyle={SLIDE_2} />
    },
  },
  {
    title: "Coming Soon!",
    subtitle: "Publish your own",
    description: "We're working on a user submission section, so stay tuned!",
    color: "#FFE4D9",

    Picture: function Picture() {
      return <OnboardingUserPosts containerStyle={SLIDE_3} />
    },
  },
]

const SLIDE_1: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  marginLeft: 75,
  marginRight: 10,
}
const SLIDE_2: ViewStyle = {
  marginRight: 75,
  marginLeft: 20,
  justifyContent: "center",
  flex: 1,
}
const SLIDE_3: ViewStyle = {
  marginRight: 30,
  marginLeft: 100,
  justifyContent: "center",
  flex: 1,
}

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
