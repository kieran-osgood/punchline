import * as Sentry from "@sentry/react-native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Linking, TextStyle, ViewStyle } from "react-native"
import { WEB_URL } from "react-native-dotenv"
import { ButtonProps, Text, TouchableOpacity } from "react-native-ui-lib"

export type LinkProps = {
  style?: ViewStyle
  children: string
  onPress?: (...args: any[]) => any
  url?: string
  external?: boolean
  inlineText?: boolean
} & ButtonProps
/**
 * Describe your component here
 */
export const Link = observer(function Link(props: LinkProps) {
  const {
    style,
    children,
    onPress: onPressCallback,
    url,
    external = false,
    inlineText = false,
    ...rest
  } = props
  const onPress = () => {
    if (url) {
      handleOpenLink(url, external)
    }
    onPressCallback?.()
  }

  if (inlineText) {
    return (
      <Text style={TEXT_LINK} {...{ onPress }}>
        {children}
      </Text>
    )
  }

  return (
    <TouchableOpacity style={style} {...{ onPress }} {...rest}>
      <Text text80>{children}</Text>
    </TouchableOpacity>
  )
})

const TEXT_LINK: TextStyle = {
  textDecorationLine: "underline",
}

export const handleOpenLink = (url: string, external = false) => {
  const fullUrl = external ? url : `${WEB_URL}${url}`
  Linking.canOpenURL(fullUrl).then((supported) => {
    if (supported) {
      Linking.openURL(fullUrl)
    } else {
      Sentry.captureMessage("Don't know how to open URI: " + fullUrl)
    }
  })
}
