import * as Sentry from "@sentry/react-native"
import { ErrorReportIcon } from "assets/images/error-report"
import { Share as ShareIcon } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { API_URL } from "react-native-dotenv"
import Share from "react-native-share"
import { Button, TouchableOpacity, View } from "react-native-ui-lib"
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
        {/* <Facebook /> */}
      </Link>
      <Link {...{ jokeId }} type="twitter">
        {/* <Twitter /> */}
      </Link>
      <Button
        round
        backgroundColor="transparent"
        onPress={() => {
          // Open a modal to take the feedbacks!
        }}
        activeOpacity={0.7}
        iconSource={() => <ErrorReportIcon height={28} width={28} />}
      />
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
  /**
   * user clicks share button - we generate a url like: https://api.punch-line.co.uk/share/joke?id=46234623
   * next user clicks link
   * link is an associated domain in the android manifest and ios
   * on clicking it will check for a file:
   * ios: https://api.punch-line.co.uk/.well-known/apple-app-site-association
   * android: https://api.punch-line.co.uk/.well-known/assetlinks.json
   *
   * these will either direct the user to the app or to the website
   * the website should be an empty page with javascript to redirect to appstore
   *
   */

  const onPress = async () => {
    try {
      const res = await Share.open({
        title: "",
        url: `${API_URL}/share/joke?id=${jokeId}`,
      })
      console.log({ res })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <TouchableOpacity onPress={() => onPress()} style={style} padding-s2>
      {children}
    </TouchableOpacity>
  )
}

export default Link
