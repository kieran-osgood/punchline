import React from 'react';
import { View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { spacing } from 'theme';
import CryingEmoji from 'assets/images/crying-emoji';
import LaughingEmoji from 'assets/images/laughing-emoji';

import BookmarkButton from 'components/bookmark-button';

interface Props {
  bookmarked: boolean;
  onBookmarkPress: () => void;
  onUpVotePress: () => void;
  onDownVotePress: () => void;
}

const Controls = ({
  bookmarked,
  onBookmarkPress,
  onDownVotePress,
  onUpVotePress,
}: Props) => {
  return (
    <View style={BUTTONS_CONTAINER}>
      <TouchableOpacity onPress={() => onDownVotePress()}>
        <CryingEmoji style={{ marginHorizontal: spacing[3] }} />
      </TouchableOpacity>
      <BookmarkButton
        bookmarked={bookmarked}
        onPress={() => onBookmarkPress()}
      />
      <TouchableOpacity onPress={() => onUpVotePress()}>
        <LaughingEmoji style={{ marginLeft: 0 }} />
      </TouchableOpacity>
    </View>
  );
};

export default Controls;

const BUTTONS_CONTAINER: ViewStyle = {
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};
