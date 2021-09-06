import React from "react"
import { Image, ImageStyle, StyleSheet } from "react-native"

const background = require("assets/images/mesh-background.png")

const MeshBackground = () => {
  return <Image style={BACKGROUND} source={background} />
}

export default MeshBackground

const BACKGROUND: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
  opacity: 0.8,
}
