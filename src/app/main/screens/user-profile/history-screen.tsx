import React, { useEffect, useState } from 'react';
import { ViewStyle, FlatList, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { color, spacing } from 'theme';
import { addToHistory } from 'app/api';

import { Joke } from 'components/joke-section';
import Text from 'components/text';
import CenterView from 'components/centerview';
import BookmarkButton from 'components/bookmark-button';

export type JokeHistory = Joke & {
  rating: boolean;
  dateSeen: Date;
  dateBookmarked: Date | null;
  bookmarked: boolean;
};

const HistoryScreen = () => {
  const [history, setHistory] = useState<JokeHistory[] | undefined>();

  useEffect(() => {
    const unsubscribe = firestore()
      .doc(`users/${auth().currentUser?.uid}`)
      .collection('history')
      .orderBy('dateSeen', 'desc')
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.docs.map((doc) => doc.data()) ?? [];
        setHistory(data as JokeHistory[]);
      });
    return () => unsubscribe();
  }, []);

  return (
    <CenterView style={CONTAINER}>
      <FlatList
        style={FLAT_LIST}
        data={history}
        renderItem={({ index, item }) => <ListItem key={index} joke={item} />}
        keyExtractor={(joke, index) => String(index) + String(joke.id)}
      />
    </CenterView>
  );
};

export default HistoryScreen;

const ListItem = ({ joke }: { joke: JokeHistory }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [bookmarked, setBookmarked] = useState(joke.bookmarked);

  const handleBookmarkPress = () => {
    setBookmarked(!bookmarked);
    addToHistory({ joke, rating: joke.rating, bookmark: !bookmarked });
  };

  if (!joke.id) return null;

  return (
    <View style={LIST_ITEM}>
      <View style={EXPANSION_HEADER}>
        <Button
          title={joke.title}
          onPress={() => setCollapsed(!collapsed)}
          containerStyle={EXPANSION_BUTTON_CONTAINER}
          buttonStyle={EXPANSION_BUTTON}
          titleStyle={{ color: color.text }}
          type="clear"
        />
        <View style={BOOKMARK_BUTTON_CONTAINER}>
          <BookmarkButton
            bookmarked={bookmarked}
            onPress={() => handleBookmarkPress()}
          />
        </View>
      </View>
      <Collapsible collapsed={collapsed} style={COLLAPSIBLE}>
        <View style={EXPANDED_VIEW}>
          <Text text="" />
          <Text text={joke.body} />
        </View>
      </Collapsible>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
  height: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const FLAT_LIST: ViewStyle = {
  width: '100%',
};
const LIST_ITEM: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: color.dim,
  borderBottomWidth: 0.5,
  display: 'flex',
};
const COLLAPSIBLE = {
  width: '100%',
};
const EXPANDED_VIEW: ViewStyle = {
  width: '100%',
  padding: spacing[3],
  backgroundColor: color.primary,
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'row',
};
const EXPANSION_HEADER: ViewStyle = {
  width: '100%',
  flex: 1,
  flexDirection: 'row',
};
const EXPANSION_BUTTON: ViewStyle = {
  justifyContent: 'flex-start',
  paddingHorizontal: spacing[3],
  paddingVertical: spacing[5],
};
const EXPANSION_BUTTON_CONTAINER: ViewStyle = {
  width: '80%',
  height: '100%',
};
const BOOKMARK_BUTTON_CONTAINER: ViewStyle = {
  width: '20%',
  borderRadius: 300,
  justifyContent: 'center',
  alignItems: 'center',
};
