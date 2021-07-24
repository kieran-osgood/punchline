import { useNavigation } from "@react-navigation/native"
import {
  jokeModelPrimitives,
  nodes,
  useQuery,
  userJokeHistoryModelPrimitives,
  UserJokeHistoryModelType,
} from "app/graphql"
import { NavigationProps } from "app/navigators"
import { Expansion } from "assets/images/expansion"
import { TrashCan } from "assets/images/trash-can"
import { EmptyState, Link, Text } from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  Alert,
  Animated as RNAnimated,
  FlatList,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { RectButton, Swipeable } from "react-native-gesture-handler"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { color, spacing } from "theme"
import { Screen } from "../../components/screen/screen"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const navigation = useNavigation<NavigationProps<"UserProfileScreen">["navigation"]>()
  const [index, setIndex] = React.useState<number | null>(null)

  const { data } = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      {},
      nodes(userJokeHistoryModelPrimitives, `joke{${jokeModelPrimitives.toString()}}`),
    ),
  )

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      {typeof data?.userJokeHistoryByUserId !== "undefined" &&
      data?.userJokeHistoryByUserId.nodes.length > 0 ? (
        <FlatList
          data={data?.userJokeHistoryByUserId.nodes}
          renderItem={({ item: bookmark, index: thisIndex }) => (
            <Bookmark
              key={bookmark.id}
              {...{ bookmark }}
              lastTouched={thisIndex === index}
              handlePress={() => setIndex(thisIndex)}
            />
          )}
        />
      ) : (
        <EmptyState
          title="Zero Bookmarks!"
          body="It appears you've not bookmarked any jokes. Make sure to press the star on jokes to save them here!"
          ctaText="Go save some jokes!"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png"
          onPress={() => navigation.navigate("JokeScreen")}
        />
      )}
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  paddingHorizontal: spacing[3],
  justifyContent: "center",
}

type BookmarkProps = {
  bookmark: UserJokeHistoryModelType
  lastTouched: boolean
  handlePress: () => void
}

export const Bookmark = (props: BookmarkProps) => {
  const {
    bookmark: { joke },
    lastTouched,
  } = props
  const [expand, setExpand] = React.useState(false)
  const touched = useDerivedValue(() => Number(lastTouched), [lastTouched])
  const query = useQuery()
  const onPress = () => {
    props.handlePress()
    setExpand((current) => !current)
  }
  const handleDelete = (id: string) => {
    query.setQuery((store) => store.mutateDeleteBookmark({ id }))
  }

  const style = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(touched.value, [0, 1], ["#000", color.success]),
    }),
    [lastTouched],
  )

  return (
    <Swipeable
      friction={2}
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RenderRightActions {...{ progressAnimatedValue, dragAnimatedValue, handleDelete }} />
      )}
    >
      <Animated.View style={[BOOKMARK, style]}>
        <TouchableOpacity style={EXPANSION_ROW} {...{ onPress }}>
          <Text h4 bold text={joke.title} style={TEXT} numberOfLines={expand ? undefined : 1} />
          <Expansion scale={1} />
        </TouchableOpacity>
        <Animated.View style={[style, { paddingVertical: spacing[3] }]}>
          {expand && (
            <>
              <Text bold text={joke.body} style={BODY} />
              {/* <ReText
                text={formattedPrice}
                style={{ color: "black", fontVariant: ["tabular-nums"] }}
              /> */}
              <Link jokeId={joke.id} style={SHARE}>
                <Text text="Share" style={SHARE_TEXT} />
              </Link>
            </>
          )}
        </Animated.View>
      </Animated.View>
    </Swipeable>
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

type Actions = {
  progressAnimatedValue: RNAnimated.AnimatedInterpolation
  dragAnimatedValue: RNAnimated.AnimatedInterpolation
  handleDelete: () => void
}

const RenderRightActions = ({ dragAnimatedValue, handleDelete }: Actions) => {
  const trans = dragAnimatedValue.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-0, 0, 0, 10],
  })
  const onPress = () => {
    Alert.alert("Confirm Delete", "Are you sure you wish to delete this bookmark?", [
      { text: "Cancel", onPress: () => {} },
      { text: "Ok", onPress: handleDelete },
    ])
  }
  return (
    <TouchableOpacity
      {...{ onPress }}
      style={{
        paddingHorizontal: spacing[2],
      }}
    >
      <RectButton>
        <RNAnimated.View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            },
            { transform: [{ translateX: trans }] },
          ]}
        >
          <TrashCan scale={1} fill={color.error} />
        </RNAnimated.View>
      </RectButton>
    </TouchableOpacity>
  )
}
