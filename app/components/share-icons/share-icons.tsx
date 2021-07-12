import * as React from "react"
import { Share, Linking, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Facebook, Twitter, Share as ShareIcon } from "images"

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
      <Link {...{ jokeId }}>
        <Facebook />
      </Link>
      <Link {...{ jokeId }}>
        <Twitter />
      </Link>
      <Link {...{ jokeId }}>
        <ShareIcon />
      </Link>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

type LinkProps = {
  jokeId: string
  children: React.ReactNode
}

export const Link = ({ jokeId, children }: LinkProps) => {
  const onPress = async () => {
    try {
      const result = await Share.share({
        title: 'Take a look at this joke!',
        message: `https://punch-line.co.uk/jokes/${jokeId}`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  }

  return <TouchableOpacity {...{ onPress }}>{children}</TouchableOpacity>
}

export default Link
