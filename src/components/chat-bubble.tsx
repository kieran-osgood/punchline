import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'theme';
// import Microphone from 'assets/images/microphone';
import ChatBubbleSVG from 'assets/images/chat-bubble';

interface Props {
  children: React.ReactNode;
}

const ChatBubble = ({ children }: Props) => {
  const [size, setSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  return (
    <View
      style={CHAT_BUBBLE_CONTAINER}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setSize({ x, y, width, height });
      }}>
      <View style={CHAT_BUBBLE}>
        <ChatBubbleSVG width={size.width} height={size.height + 80} />
      </View>
      {children}
    </View>
  );
};

export default ChatBubble;

const CHAT_BUBBLE_CONTAINER: ViewStyle = {
  position: 'relative',
  width: '95%',
  minWidth: '90%',
  maxWidth: 1000,
  alignItems: 'center',
  borderRadius: 15,
  minHeight: 300,
  padding: spacing[4],
  marginVertical: spacing[3],
};

const CHAT_BUBBLE: ViewStyle = {
  position: 'absolute',
  width: '100%',
  top: 0,
  left: 0,
};
