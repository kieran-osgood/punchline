import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { color } from "theme"
import { Text } from "../"

const { width, height } = Dimensions.get("window")
export const SLIDE_HEIGHT = 0.61 * height
const styles = StyleSheet.create({
  container: {
    width,
  },
  text: {
    color: color.palette.white,
    fontWeight: "600",
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
})

export interface SlideProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
  right?: boolean
}

/**
 * Describe your component here
 */
export const Slide = observer(function Slide(props: SlideProps) {
  const { title, right } = props
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: right ? width / 2 - 50 : -width / 2 + 50 },
    { rotate: right ? "-90deg" : "90deg" },
  ]
  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text h1 style={styles.text}>
          {title}
        </Text>
      </View>
    </View>
  )
})
