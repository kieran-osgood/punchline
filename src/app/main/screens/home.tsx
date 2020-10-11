import React, { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import ChatBubble from 'components/chat-bubble';
import Microphone from 'assets/images/microphone';
import AppLogo from 'components/app-logo';
import useGetCategories from 'components/useGetCategories';
import { useCategoriesContext } from 'components/categories-context';
import { CategorySettings } from 'components/select-pills';

export default function Home() {
  useGetCategories();
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

type Joke = {
  body: string;
  id: string;
  category: string;
  random: string;
  title: string;
};

const JokeSection = () => {
  /**
   * ===== ORDER OF ATTACK ======
   * When a user submits they're rating for a joke, add it to the 'user/{user}/jokes' sub-collection
   * add the FULL joke + rating they gave (not to be confused with the average rating)
   * this enables us to show a history/bookmark page (need to add a bookmark field also)
   * ! use the array-contains?: https://cloud.google.com/firestore/docs/query-data/queries#node.js_6
   * const joke = jokesRef.where('category', 'array-contains', 'blonde').get(); (works if 'category' === Category[])
   * when we've pulled the joke, we need to make sure it doesn't match an id in the 'user/{user}/jokes' sub-collection
   */
  const [joke, setJoke] = useState<Joke>({
    body: '',
    id: '',
    category: '',
    random: '',
    title: '',
  });
  const { categories } = useCategoriesContext();

  const newJoke = async () => {
    setJoke(await getRandomJoke(categories));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: spacing[2],
      }}>
      <Text
        h2
        text={joke.title}
        style={{
          color: color.storybookDarkBg,
        }}
      />
      <ChatBubble>
        <Text style={{ fontSize: 18, padding: spacing[2] }} text={joke.body} />
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
      <Button onPress={() => newJoke()} title="test" />
    </View>
  );
};
const getRandomJoke = async (categories: CategorySettings[]): Promise<Joke> => {
  var randomIdx = Math.floor(Math.random() * categories.length);
  const category = categories[randomIdx];
  const jokesRef = firestore().collection('jokes');
  const randomId = jokesRef.doc().id;

  let jokesQuery = jokesRef.where('random', '>', randomId).limit(1);

  if (category !== undefined) {
    console.log('category: ', category);
    jokesQuery = jokesRef
      .where('category', '==', category.name)
      .where('random', '>', randomId)
      .limit(1);
  }

  const jokesSnapshot = await jokesQuery.get();
  console.log('jokesSnapshot: ', jokesSnapshot.docs);
  return jokesSnapshot.docs[0].data() as Joke;
};
