/* eslint-disable react-native/no-color-literals */
// @flow
import * as React from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"

export interface ProfileModel {
  id: string
  name: string
  age: number
  profile: number
}

const { width } = Dimensions.get("window")
export const α = Math.PI / 12
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
    padding: 16,
  },
})

interface CardProps {
  profile: ProfileModel
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
  scale: Animated.SharedValue<number>
  onTop: boolean
}

const Profile = ({ profile, translateX, translateY, onTop, scale }: CardProps) => {
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
  const nope = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [-width / 4, 0], [1, 0]),
  }))
  const like = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [0, width / 4], [0, 1], Extrapolate.CLAMP),
  }))

  return (
    <Animated.View style={[StyleSheet.absoluteFill, container]}>
      <Image style={styles.image} source={profile.profile} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, like]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, nope]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default Profile
