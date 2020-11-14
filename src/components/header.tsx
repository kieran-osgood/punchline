import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import AppLogo from 'components/app-logo';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'theme';

const Header = () => (
  <>
    <View style={LOGO_CONTAINER}>
      <AppLogo style={LOGO} width={130} />
    </View>
    <BannerAd
      unitId={TestIds.BANNER} // ! Setup to check process.env
      size={BannerAdSize.SMART_BANNER}
    />
  </>
);

const LOGO_CONTAINER: ViewStyle = {
  width: '100%',
  // flex: 0.1,
};

const LOGO: ViewStyle = {
  padding: spacing[1],
  alignSelf: 'auto',
  justifyContent: 'flex-start',
  // flex: 0.2,
};

export default Header;
