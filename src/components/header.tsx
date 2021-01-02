import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import AppLogo from 'components/app-logo';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Header = () => (
  <>
    <View style={LOGO_CONTAINER}>
      <AppLogo style={LOGO} height={hp('5%')} width={wp('35%')} />
    </View>
    <BannerAd
      unitId={
        process.env.NODE_ENV === 'production'
          ? 'ca-app-pub-3681973098458031/3206308809'
          : TestIds.BANNER
      }
      size={BannerAdSize.SMART_BANNER}
    />
  </>
);

const LOGO_CONTAINER: ViewStyle = {
  width: '100%',
};

const LOGO: ViewStyle = {
  padding: spacing[1],
  alignSelf: 'auto',
  justifyContent: 'flex-start',
};

export default Header;
