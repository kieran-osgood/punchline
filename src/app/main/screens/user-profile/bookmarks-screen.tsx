import React, { useEffect, useState } from 'react';
import { ViewStyle, FlatList, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { color, spacing } from 'theme';

import { Joke } from 'app/main/screens/home';
import Text from 'components/text';
import CenterView from 'components/centerview';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState<Joke[] | undefined>();
  useEffect(() => {
    let userRef;
    async function loadBookmarks() {
      userRef = await firestore()
        .doc(`users/${auth().currentUser?.uid}`)
        .collection('bookmarks')
        .limit(10)
        .get();
      const data = userRef.docs.map((doc) => doc.data());
      setBookmarks(data as Joke[]);
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

const ListItem = ({ joke }: { joke: Joke }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
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
