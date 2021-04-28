import * as React from "react"
import { ViewStyle, View, Image, ImageStyle } from "react-native"
import { IconTypes, icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export interface IconProps {
  style?: ImageStyle
  containerStyle?: ViewStyle
  icon: IconTypes
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
