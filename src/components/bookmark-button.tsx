import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { color } from 'theme';
interface Props {
  bookmarked: boolean;
  onPress: () => void;
}

const BookmarkButton = ({ bookmarked, onPress }: Props) => {
  return (
    <Icon
      name={bookmarked ? 'star' : 'staro'}
      size={40}
      color={bookmarked ? color.success : color.palette.black}
      onPress={() => onPress()}
    />
  );
};

export default BookmarkButton;
