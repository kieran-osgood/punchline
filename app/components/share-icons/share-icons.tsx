import { Facebook, Share as ShareIcon, Twitter } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Share from "react-native-share"
import { TouchableOpacity, View } from "react-native-ui-lib"

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
    <View style={style} row center>
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
    try {
      const res = await Share.shareSingle({
        title: "Share via",
        message: "some message",
        url: "https://web.punch-line.co.uk",
        social: Share.Social.FACEBOOK,
        subject: "gufy",
        type: "asdf",
      })
      console.log({ res })
    } catch (error) {
      error && console.log(error)
    }
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
    <TouchableOpacity onPress={() => onPress()} style={style} padding-s2>
      {children}
    </TouchableOpacity>
  )
}

export default Link
