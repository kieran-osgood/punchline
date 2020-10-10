import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import ChatBubble from 'components/chat-bubble';
import Microphone from 'assets/images/microphone';
import AppLogo from 'components/app-logo';
import { Button } from 'react-native-elements';

export default function Home() {
  return (
    <CenterView>
      <Header />
      <JokeSection />
      {/* <RatingButtons /> */}

      {/* <Image source={require('assets/images/laughing-emoji.png')} /> */}
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
      unitId={TestIds.BANNER} // ! Setup to check process.env
      size={BannerAdSize.FULL_BANNER}
    />
    <AppLogo />
  </>
);

export const firestoreAutoId = (): string => {
  const CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

const JokeSection = () => {
  /**
   * ===== ORDER OF ATTACK ======
   * When a user submits they're rating for a joke, add it to the 'user/{user}/jokes' sub-collection
   * add the FULL joke + rating they gave (not to be confused with the average rating)
   * this enables us to show a history/bookmark page (need to add a bookmark field also)
   * ===== NEW JOKE =====
   * when we pull a new joke we need to do the random id as per this answer:
   * https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
   * ! use the array-contains?: https://cloud.google.com/firestore/docs/query-data/queries#node.js_6
   * const joke = jokesRef.where('category', '==', 'blonde').get();
   * ? OR ?
   * const joke = jokesRef.where('category', 'array-contains', 'blonde').get(); (works if 'category' === Category[])
   * when we've pulled the joke, we need to make sure it doesn't match an id in the 'user/{user}/jokes' sub-collection
   */

  const newJoke = async () => {
    console.log('new joke');
    const randomId = firestoreAutoId();
    const category = 'Blond';
    const jokesRef = firestore().collection('jokes');
    const jokesSnapshot = await jokesRef
      .where('category', '==', category)
      .where('random', '>', randomId)
      .limit(1)
      .get();

    console.log('empty: ', jokesSnapshot.empty);
    jokesSnapshot.forEach((doc) => {
      console.log('doc.data(): ', doc.data());
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: spacing[2],
      }}>
      <Button onPress={() => newJoke()} title="test" />
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
};
