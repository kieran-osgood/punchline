import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import Text from 'components/text';
import CenterView from 'components/centerview';

export default function Home() {
  return (
    <CenterView>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
      <Text h1 text="Home" />
    </CenterView>
  );
}
