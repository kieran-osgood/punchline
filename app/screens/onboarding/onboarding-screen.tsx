import { useNavigation } from "@react-navigation/core"
import { useStores } from "app/models"
import { NavigationProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { useRef } from "react"
import { Dimensions, Image, StyleSheet, View, ViewStyle } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { Dot, Screen, Slide as SlideCompoent, SLIDE_HEIGHT, SubSlide } from "../../components"
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
  picture: {
    width: number
    height: number
    src: number
  }
}

export const slides: Slide[] = [
  {
    title: "Categories",
    subtitle: "Block Categories",
    description:
      "Select the types of jokes you don't want to see in the settings page to optimise your experience!",
    color: "#BFEAF5",
    picture: {
      src: "",
      // src: require("../assets/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Bookmarks",
    subtitle: "Save Your Favourites",
    description: "Save your favourites with the bookmark button to come back to at any time.",
    color: "#BEECC4",
    picture: {
      src: "",
      // src: require("../assets/2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Share",
    subtitle: "Share Jokes",
    description: "Can't wait to see your friends to share? Share to social media!",
    color: "#FFE4D9",
    picture: {
      src: "",
      // src: require("../assets/3.png"),
      width: 2738,
      height: 3244,
    },
  },
  // {
  //   title: "Funky",
  //   subtitle: "Look Good, Feel Good",
  //   description: "Discover the latest trends in fashion and explore your personality",
  //   color: "#FFDDDD",
  //   picture: {
  //     src: "",
  //     // src: require("../assets/4.png"),
  //     width: 1757,
  //     height: 2551,
  //   },
  // },
]
export const assets = slides.map((slide) => slide.picture.src)

export const OnboardingScreen = observer(function OnboardingScreen() {
  const navigation = useNavigation<NavigationProps<"OnboardingScreen">["navigation"]>()
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
          {slides.map(({ picture }, index) => {
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
                <Image
                  source={picture.src}
                  style={{
                    width: width - 75,
                    height: ((width - 75) * picture.height) / picture.width,
                  }}
                />
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
            {slides.map(({ title, picture }, index) => (
              <SlideCompoent key={index} right={!!(index % 2)} {...{ title, picture }} />
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
