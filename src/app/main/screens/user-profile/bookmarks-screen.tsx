import React, { useState } from 'react';
import { ViewStyle, FlatList, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { color, spacing } from 'theme';

import { Joke } from 'app/main/screens/home';
import Text from 'components/text';
import CenterView from 'components/centerview';

const BookmarksScreen = () => {
  return (
    <CenterView style={CONTAINER}>
      <FlatList
        style={FLAT_LIST}
        data={arr}
        renderItem={({ index, item }) => <ListItem key={index} joke={item} />}
        keyExtractor={(joke) => joke.id}
      />
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
  // margin: spacing[2],
  justifyContent: 'center',
  alignItems: 'center',
};
// const BOOKMARK_BUTTON: ViewStyle = {
//   height: '100%',
//   width: '100%',
// };
const arr = [
  {
    title: 'joke',
    body:
      'body body body body body body body body body body body body body body body body body body body body body body body body body body ',
    id: '1',
    random: 'asd',
    category: 'blonde',
    bookmarked: false,
  },
  {
    title: 'joke',
    body:
      'body body body body body body body body body body body body body body body body body body body body body body body body body body ',
    id: '2',
    random: 'asd',
    category: 'blonde',
    bookmarked: false,
  },
  {
    title: 'joke',
    body:
      'body body body body body body body body body body body body body body body body body body body body body body body body body body ',
    id: '3',
    random: 'asd',
    category: 'blonde',
    bookmarked: false,
  },
  {
    title: 'joke',
    body:
      'body body body body body body body body body body body body body body body body body body body body body body body body body body ',
    id: '4',
    random: 'asd',
    category: 'blonde',
    bookmarked: false,
  },
  {
    title: 'joke',
    body:
      'body body body body body body body body body body body body body body body body body body body body body body body body body body ',
    id: '5',
    random: 'asd',
    category: 'blonde',
    bookmarked: false,
  },
];
