import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import Slider from '@react-native-community/slider';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import ChatBubble from 'components/chat-bubble';
import Microphone from 'assets/images/microphone';
import AppLogo from 'components/app-logo';

export default function Home() {
  return (
    <CenterView>
      <Header />
      <JokeSection />
      <Slider
        style={{ width: 300, height: 140 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={color.primaryDarker}
        maximumTrackTintColor="#FFFFFF"
        thumbImage={require('assets/images/laughing-emoji.png')}
      />
      {/* <RatingButtons /> */}
    </CenterView>
  );
}

const Header = () => (
  <>
    <BannerAd
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '90%',
      }}
      unitId={TestIds.BANNER} // Setup to check process.env
      size={BannerAdSize.FULL_BANNER}
    />
    <AppLogo />
  </>
);

const JokeSection = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: spacing[2],
    }}>
    <Text
      h2
      text="The phone call..."
      style={{
        color: color.storybookDarkBg,
      }}
    />
    <ChatBubble>
      <Text
        style={{ fontSize: 18, padding: spacing[2] }}
        text={
          'A married couple were asleep when the phone rang at 2 in the morning. The wife (a blonde), picked up the phone, listened a moment and said, "How should I know, that\'s 200 miles from here!" and hung up. Curious, the husband said, "Who was that?"And his lovely wife replies, "I don\'t have any idea who it was. It was some stupid woman wanting to know "if the coast is clear."'
        }
      />
      <Microphone
        style={{
          width: 200,
          height: 200,
          zIndex: 10,
          opacity: 0.4,
          position: 'absolute',
          bottom: '-100%',
          left: '25%',
          transform: [{ rotateZ: '-40deg' }],
        }}
      />
    </ChatBubble>
  </View>
);
