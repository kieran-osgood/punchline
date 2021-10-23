import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import {
  AppleSignInButton,
  FacebookSignInButton,
  GoogleSignInButton,
  OptionsBottomSheet,
} from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Toast from "react-native-toast-message"
import { Text, View } from "react-native-ui-lib"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardSocialSigninConversionSheetProps = {}

export interface SocialSigninConversionSheetProps {}

/**
 * Describe your component here
 */
const ForwardSocialSigninConversionSheet = (
  props: ForwardSocialSigninConversionSheetProps,
  ref: React.Ref<OptionsBottomSheet>,
) => {
  if (!auth().currentUser?.isAnonymous) return null

  const onSuccess = (provider: string) => {
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: `Next time you log in select the ${provider} login button.`,
      position: "bottom",
    })
  }
  const onError = (error: Error) => {
    Sentry.captureException(error)

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      position: "bottom",
    })
  }

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <View marginT-s5>
        <View center>
          <Text text50 bold>
            Link Social Account
          </Text>
          <Text marginT-s3>
            Convert your guest account using a social media identity to save your bookmarks and
            preferences.
          </Text>
        </View>
        <View paddingV-s3 flex-1 width="100%" center>
          <View width="70%">
            <GoogleSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
            <FacebookSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
            <AppleSignInButton isAnonymousConversion {...{ onSuccess, onError }} />
          </View>
        </View>
      </View>
    </BottomSheetHoc>
  )
}

export const SocialSigninConversionSheet = observer(ForwardSocialSigninConversionSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
  paddingVertical: 20,
}
