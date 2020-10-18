import React, { useEffect, useState } from 'react';
import { ViewStyle, FlatList, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { color, spacing } from 'theme';

import { Joke } from 'app/main/screens/home';
import Text from 'components/text';
import CenterView from 'components/centerview';
import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';

type BookmarkedJoke = Joke & { rating: boolean };

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedJoke[] | undefined>();

  useEffect(() => {
    let userRef;
    async function loadBookmarks() {
      userRef = await firestore()
        .doc(`users/${auth().currentUser?.uid}`)
        .collection('bookmarks')
        // .limit(10)
        .get();
      const data = userRef.docs.map((doc) => doc.data());
      setBookmarks(data as BookmarkedJoke[]);
    }
    loadBookmarks();
  }, []);

  return (
    <CenterView style={CONTAINER}>
      {typeof bookmarks !== 'undefined' && (
        <FlatList
          style={FLAT_LIST}
          data={bookmarks}
          renderItem={({ index, item }) => <ListItem key={index} joke={item} />}
          keyExtractor={(joke) => joke.id}
        />
      )}
    </CenterView>
  );
};

export default BookmarksScreen;

const ListItem = ({ joke }: { joke: BookmarkedJoke }) => {
  const [rating, setRating] = useState(joke.rating);
  const [collapsed, setCollapsed] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  const changeRating = (newRating: boolean) => {
    firestore()
      .doc(`users/${auth().currentUser?.uid}/bookmarks/${joke.random}`)
      .set({ rating: newRating }, { merge: true });
    setRating(newRating);
  };

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
          icon={
            <FAIcon
              name="chevron-down"
              size={10}
              color={color.text}
              style={{ paddingTop: spacing[1], paddingRight: spacing[2] }}
            />
          }
        />
        <View style={BOOKMARK_BUTTON_CONTAINER}>
          {rating === false ? (
            <TouchableOpacity
              style={{
                ...RATING_BUTTON,
                marginVertical: 1,
                marginHorizontal: 3,
              }}
              onPress={() => changeRating(true)}>
              <CryingEmoji width={26} height={26} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={RATING_BUTTON}
              onPress={() => changeRating(false)}>
              <LaughingEmoji width={32} height={28} />
            </TouchableOpacity>
          )}
          <Icon
            name="ios-trash"
            size={33}
            color={color.error}
            onPress={() => setBookmarked(!bookmarked)}
          />
        </View>
      </View>
      <Collapsible collapsed={collapsed}>
        <View style={EXPANDED_VIEW}>
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
const EXPANDED_VIEW: ViewStyle = {
  width: '100%',
  padding: spacing[3],
  backgroundColor: color.primary,
};
const EXPANSION_HEADER: ViewStyle = {
  width: '100%',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
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
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexDirection: 'row',
  paddingRight: spacing[3],
};
const RATING_BUTTON: ViewStyle = {
  paddingRight: spacing[5],
};
