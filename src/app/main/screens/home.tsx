import React from 'react';
import { Button, ScrollView, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-deck-swiper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import useGetUserCategories from 'components/useGetUserCategories';
import useGetCategories from 'components/useGetCategories';
import Header from 'components/header';

export default function Home() {
  useGetUserCategories();
  useGetCategories();
  const swiper = React.useRef<Swiper<string> | null>(null);

  const onHappyClick = () => swiper.current?.swipeRight();

  return (
    <CenterView>
      <Header />
      <CenterView style={{ width: '100%', marginTop: spacing[2] }}>
        <Swiper
          ref={swiper}
          cards={cards}
          cardHorizontalMargin={0}
          infinite
          cardVerticalMargin={0}
          verticalSwipe={false}
          horizontalSwipe={false}
          disablePanresponder={false}
          renderCard={() => {
            return (
              <View
                style={{
                  borderRadius: 50,
                  // height: '50%',
                  marginHorizontal: spacing[2],
                  backgroundColor: 'white',
                  padding: spacing[4],
                  borderColor: 'grey',
                  borderWidth: 1,
                  position: 'relative',
                  // zIndex: 2000,
                  flex: 0.5,
                }}>
                <ScrollView
                  scrollEnabled
                  showsVerticalScrollIndicator
                  persistentScrollbar
                  onScroll={() => console.log('test')}
                  scrollIndicatorInsets={{
                    top: spacing[4],
                    bottom: spacing[4],
                    right: spacing[1],
                  }}>
                  <TouchableWithoutFeedback>
                    <View style={{ paddingBottom: hp('5%') }}>
                      <Text
                        style={{
                          fontSize: 18,
                          padding: spacing[2],
                          zIndex: 9999,
                        }}
                        text={cards[0]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={0}
          backgroundColor={color.background}
          stackSize={2}
        />
      </CenterView>
      {/* <JokeSection /> */}
      <Button title="here we go" onPress={() => onHappyClick()} />
    </CenterView>
  );
}

const cards = [
  'DO DOODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODDO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DO',
  'DO DOODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODDO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DODO DO',
];
