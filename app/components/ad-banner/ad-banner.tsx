import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob"
import { noop } from "app/utils"
import { isProduction } from "app/utils/current-environment"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { ADMOB_HOME_FOOTER } from "react-native-dotenv"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { View } from "react-native-ui-lib"

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
      {/* TODO: Give this a fixed height - it's currently causing layout shift and unmounting on each navigation */}
      <BannerAd
        {...{ unitId }}
        size={BannerAdSize.SMART_BANNER}
        // prop types require these to be added
        onAdClosed={noop}
        onAdFailedToLoad={noop}
        onAdLeftApplication={noop}
        onAdLoaded={noop}
        onAdOpened={noop}
      />
    </View>
  )
})
