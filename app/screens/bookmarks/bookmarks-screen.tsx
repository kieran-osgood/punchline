import React from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { color, spacing } from "theme"
import { Screen } from "../../components/screen/screen"
import { Link, Text } from "components"
import { Expansion } from "assets/images/expansion"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"

export const BookmarksScreen = observer(function BookmarksScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [index, setIndex] = React.useState<number | null>(null)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      {/* <Text h1 bold text="Bookmarks" /> */}
      <FlatList
        data={bookmarks}
        renderItem={({ item: bookmark, index: thisIndex }) => (
          <Bookmark
            key={bookmark.id}
            {...{ bookmark }}
            lastTouched={thisIndex === index}
            handlePress={() => setIndex(thisIndex)}
          />
        )}
      />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  paddingHorizontal: spacing[3],
}

const bookmarks = [
  {
    id: "2",
    body: "A totally original joke!",
    score: 0,
    title: "The Car Joke",
    __typename: "Joke",
  },
  {
    id: "1",
    title: "The Really again a Car Joke",
    body:
      "A totally originaloriginal original original  totally originaloriginal original original j  totally originaloriginal original original j joke!",
    score: 0,
    __typename: "Joke",
  },
  {
    id: "a",
    body: "A totally original joke!",
    score: 0,
    title: "The Car Joke",
    __typename: "Joke",
  },
  {
    id: "b",
    title: "The Really again a Car Joke",
    body:
      "A totally originaloriginal original original  totally originaloriginal original original j  totally originaloriginal original original j joke!",
    score: 0,
    __typename: "Joke",
  },
  {
    id: "c",
    body: "A totally original joke!",
    score: 0,
    title: "The Car Joke",
    __typename: "Joke",
  },
  {
    id: "d",
    title: "The Really again a Car Joke",
    body:
      "A totally originaloriginal original original  totally originaloriginal original original j  totally originaloriginal original original j joke!",
    score: 0,
    __typename: "Joke",
  },
  {
    id: "e",
    body: "A totally original joke!",
    score: 0,
    title: "The Car Joke",
    __typename: "Joke",
  },
  {
    id: "f",
    title: "The Really again a Car Joke",
    body:
      "A totally originaloriginal original original  totally originaloriginal original original j  totally originaloriginal original original j joke!",
    score: 0,
    __typename: "Joke",
  },
]

type BookmarkProps = {
  bookmark: typeof bookmarks[0]
  lastTouched: boolean
  handlePress: () => void
}

export const Bookmark = (props: BookmarkProps) => {
  const { bookmark, lastTouched } = props
  const [expand, setExpand] = React.useState(false)
  const touched = useDerivedValue(() => Number(lastTouched), [lastTouched])

  const onPress = () => {
    props.handlePress()
    setExpand((current) => !current)
  }

  const style = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(touched.value, [0, 1], ["#000", color.success]),
    }),
    [lastTouched],
  )

  return (
    <Animated.View style={[BOOKMARK, style]}>
      <TouchableOpacity style={EXPANSION_ROW} {...{ onPress }}>
        <Text h4 bold text={bookmark.title} style={TEXT} numberOfLines={expand ? undefined : 1} />
        <Expansion scale={1} />
      </TouchableOpacity>
      <Animated.View style={[style, { paddingVertical: spacing[3] }]}>
        {expand && (
          <>
            <Text bold text={bookmark.body} style={BODY} />
            {/* <ReText
                text={formattedPrice}
                style={{ color: "black", fontVariant: ["tabular-nums"] }}
              /> */}
            <Link jokeId="" style={SHARE}>
              <Text text="Share" style={SHARE_TEXT} />
            </Link>
          </>
        )}
      </Animated.View>
    </Animated.View>
  )
}

const BOOKMARK: ViewStyle = {
  borderColor: "black",
  borderWidth: 1,
  borderRadius: 25,
  padding: spacing[5],
  marginTop: spacing[3],
}
const EXPANSION_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const TEXT: TextStyle = {
  width: "90%",
  flexWrap: "wrap",
}
const BODY: TextStyle = {
  color: color.dim,
}
const SHARE: ViewStyle = {
  backgroundColor: "transparent",
  borderColor: "#000",
  borderWidth: 1.5,
  borderRadius: 5,
  width: "50%",
  alignSelf: "flex-end",
  marginTop: spacing[3],
}
const SHARE_TEXT: TextStyle = {
  color: "#000",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  paddingVertical: spacing[2],
}
