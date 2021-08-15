import { Facebook, Share as ShareIcon, Twitter } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import Share from "react-native-share"
import { spacing } from "theme"

export interface ShareIconsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  jokeId: string
}

/**
 * Describe your component here
 */
export const ShareIcons = observer(function ShareIcons(props: ShareIconsProps) {
  const { jokeId, style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Link {...{ jokeId }} type="facebook">
        <Facebook />
      </Link>
      <Link {...{ jokeId }} type="twitter">
        <Twitter />
      </Link>
      <Link {...{ jokeId }}>
        <ShareIcon scale={1.1} />
      </Link>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

export function assertNever<T>(_value: never): T {
  return _value
}

type LinkProps = {
  jokeId: string
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  type?: Type
}

type Type = "facebook" | "twitter" | "default"

export const Link = ({ jokeId, children, style = {}, type = "default" }: LinkProps) => {
  const onPress = async () => {
    Share.shareSingle({
      title: "Share via",
      message: "some message",
      url: "some share url",
      social: Share.Social.FACEBOOK,
    })
      .then((res) => {
        console.log({ res })
      })
      .catch((err) => {
        err && console.log(err)
      })
    // try {
    //   const result = await Share.share({
    //     title: "Take a look at this joke!",
    //     message: `/${jokeId}`,
    //   })
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   // alert(error.message);
    // }
  }

  return (
    <TouchableOpacity {...{ onPress }} style={[LINK, style]}>
      {children}
    </TouchableOpacity>
  )
}

export default Link

const LINK: ViewStyle = {
  padding: spacing[1],
}
