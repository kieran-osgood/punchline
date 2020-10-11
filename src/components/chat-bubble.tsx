import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
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
        <ChatBubbleSVG
          style={{ top: 0, left: 0, position: 'absolute' }}
          width={size.width}
          height={size.height}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          width: size.width - 20,
          height: '60%',
        }}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ChatBubble;

const CHAT_BUBBLE_CONTAINER: ViewStyle = {
  position: 'relative',
  width: '90%',
  minWidth: '80%',
  alignItems: 'center',
  maxHeight: 600,
  borderRadius: 15,
  minHeight: 300,
  padding: spacing[4],
  marginVertical: spacing[3],
};

const CHAT_BUBBLE: ViewStyle = {
  position: 'absolute',
  width: '100%',
  height: '70%',
  top: 0,
  left: 0,
};
