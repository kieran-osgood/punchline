import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View } from "react-native-ui-lib"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const testID = props.testID
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle, NO_SCROLL_VIEW]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
      {...{ testID }}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}
const NO_SCROLL_VIEW: ViewStyle = {
  paddingTop: 0,
  marginTop: 0,
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const testID = props.testID
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
      {...{ testID }}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
