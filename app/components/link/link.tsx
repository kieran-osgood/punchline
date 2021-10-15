import * as Sentry from "@sentry/react-native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Linking, TextStyle, ViewStyle } from "react-native"
import { WEB_URL } from "react-native-dotenv"
import { Button, Text } from "react-native-ui-lib"
import { spacing } from "../../theme"

export type LinkProps = {
  children: string
  onPress?: (...args: any[]) => any
  url?: string
  external?: boolean
  inlineText?: boolean
}
/**
 * Describe your component here
 */
export const Link = observer(function Link(props: LinkProps) {
  const { children, onPress: onPressCallback, url, external = false, inlineText = false } = props
  // TODO: Break this out into a separate file component
  // TODO: reduce the font size so that it doesn't look so drastically different to preferences section
  const onPress = () => {
    if (url) {
      const fullUrl = external ? url : `${WEB_URL}${url}`
      Linking.canOpenURL(fullUrl).then((supported) => {
        if (supported) {
          Linking.openURL(fullUrl)
        } else {
          Sentry.captureMessage("Don't know how to open URI: " + fullUrl)
        }
      })
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
  return <Button link style={LINK} label={children} {...{ onPress }} />
})

const LINK: ViewStyle = {
  paddingVertical: spacing[3],
}

const TEXT_LINK: TextStyle = {
  textDecorationLine: "underline",
}
