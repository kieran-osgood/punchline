import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob"
import { isProduction } from "app/utils/current-environment"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View, ViewStyle } from "react-native"

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
  const unitId = isProduction ? "ca-app-pub-3681973098458031/3206308809" : TestIds.BANNER

  return (
    <View style={{ minHeight: 50 }}>
      <BannerAd
        {...{ unitId }}
        size={BannerAdSize.SMART_BANNER}
        // prop types require these to be added
        onAdClosed={() => {}}
        onAdFailedToLoad={() => {}}
        onAdLeftApplication={() => {}}
        onAdLoaded={() => {}}
        onAdOpened={() => {}}
      />
    </View>
  )
})
