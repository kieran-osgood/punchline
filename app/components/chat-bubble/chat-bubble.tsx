import * as React from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "theme"
import { ChatBubbleSvg } from "images"

export interface ChatBubbleProps {
  /**
   * An optional style override useful for padding & margin.
   */
  children: React.ReactNode
}

/**
 * Describe your component here
 */
export const ChatBubble = observer(function ChatBubble(props: ChatBubbleProps) {
  const [size, setSize] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const { children } = props
  return (
    <View
      style={CHAT_BUBBLE_CONTAINER}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout
        setSize({ x, y, width, height })
      }}
    >
      <View style={CHAT_BUBBLE_WRAPPER}>
        <ChatBubbleSvg style={CHAT_BUBBLE} width={size.width} height={size.height} />
      </View>
      <ScrollView
        contentContainerStyle={SCROLL_VIEW(size.width)}
      >
        {children}
      </ScrollView>
    </View>
  )
})

const CHAT_BUBBLE_CONTAINER: ViewStyle = {
  position: "relative",
  width: "90%",
  minWidth: "80%",
  alignItems: "center",
  maxHeight: 600,
  borderRadius: 15,
  minHeight: 300,
  padding: spacing[4],
  marginVertical: spacing[3],
}

const CHAT_BUBBLE_WRAPPER: ViewStyle = {
  position: "absolute",
  width: "100%",
  height: "70%",
  top: 0,
  left: 0,
}

const CHAT_BUBBLE: ViewStyle = {
  top: 0,
  left: 0,
  position: "absolute",
}

const SCROLL_VIEW = (width: number): ViewStyle => ({
  width: width - 20,
  height: "60%",
})
