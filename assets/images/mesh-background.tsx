import React from "react"
import { ImageStyle, StyleSheet } from "react-native"
import { Image } from "react-native-ui-lib"

const background = require("assets/images/mesh-background.png")

const MeshBackground = () => {
  return <Image style={BACKGROUND} source={background} />
}

export default MeshBackground

const BACKGROUND: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
  height: "100%",
}
