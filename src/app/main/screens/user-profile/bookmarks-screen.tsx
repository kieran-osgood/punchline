import React, { useEffect, useState } from 'react';
import {
  ViewStyle,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { color, spacing } from 'theme';

import Text from 'components/text';
import CenterView from 'components/centerview';
import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';
import { JokeHistory } from 'screens/user-profile/history-screen';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState<JokeHistory[] | undefined>();

  useEffect(() => {
    const unsubscribe = firestore()
      .doc(`users/${auth().currentUser?.uid}`)
      .collection('history')
      .where('bookmarked', '==', true)
      .orderBy('dateBookmarked', 'desc')
      .onSnapshot((docSnapshot) => {
        // console.log('docSnapshot: ', docSnapshot);
        if (docSnapshot !== null) {
          const data = docSnapshot.docs.map((doc) => doc.data()) ?? [];
          setBookmarks(data as JokeHistory[]);
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <CenterView style={CONTAINER}>
      <Text text="Bookmarked jokes will appear here." />
      {typeof bookmarks !== 'undefined' && bookmarks.length > 0 && (
        <FlatList
          style={FLAT_LIST}
          data={bookmarks}
          renderItem={({ item }) => (
            <ListItem key={String(item.random)} joke={item} />
          )}
          keyExtractor={(joke) => String(joke.random)}
        />
      )}
    </CenterView>
  );
};

export default BookmarksScreen;

const ListItem = ({ joke }: { joke: JokeHistory }) => {
  const [rating, setRating] = useState(joke.rating);
  const [collapsed, setCollapsed] = useState(true);
  const [visible, setVisible] = useState(true);

  const changeRating = (newRating: boolean) => {
    firestore()
      .doc(`users/${auth().currentUser?.uid}/history/${joke.random}`)
      .set({ rating: newRating }, { merge: true });
    setRating(newRating);
  };

  const deleteBookmark = () => {
    firestore()
      .doc(`users/${auth().currentUser?.uid}/history/${joke.random}`)
      .set({ bookmarked: false }, { merge: true })
      .then(() => {
        setVisible(false);
      });
  };

  if (!visible) {
    return null;
  }
  const handleDeletePress = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you wish to remove this bookmark?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => deleteBookmark() },
      ],
      { cancelable: false },
    );
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
            onPress={() => handleDeletePress()}
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

const COLLAPSIBLE: ViewStyle = {
  width: '100%',
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
