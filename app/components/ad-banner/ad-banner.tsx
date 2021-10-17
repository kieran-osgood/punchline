import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob"
import { noop } from "app/utils"
import { isProduction } from "app/utils/current-environment"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { ADMOB_HOME_FOOTER } from "react-native-dotenv"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { View } from "react-native-ui-lib"

const onAdClosed = noop
const onAdFailedToLoad = noop
const onAdLeftApplication = noop
const onAdLoaded = noop
const onAdOpened = noop
const size = BannerAdSize.SMART_BANNER
export interface AdBannerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const AdBanner = observer(function AdBanner(props: AdBannerProps) {
  const unitId = isProduction ? ADMOB_HOME_FOOTER : TestIds.BANNER

  return (
    <View style={[{ height: heightPercentageToDP("10%") }, props.style]}>
      <BannerAd
        // prop types require these to be added
        {...{
          unitId,
          onAdClosed,
          onAdFailedToLoad,
          onAdLeftApplication,
          onAdLoaded,
          onAdOpened,
          size,
        }}
      />
    </View>
  )
})
