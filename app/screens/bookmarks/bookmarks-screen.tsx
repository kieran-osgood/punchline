import { useNavigation } from "@react-navigation/native"
import {
  nodes,
  useQuery,
  userJokeHistoryModelPrimitives,
  UserJokeHistoryModelType,
} from "app/graphql"
import { NavigationProps } from "app/navigators"
import EmptyStateImage from "assets/images/empty-state-image"
import { TrashCan } from "assets/images/trash-can"
import { BookmarkButton, EmptyState, Link } from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  Alert,
  Animated as RNAnimated,
  FlatList,
  RefreshControl,
  StatusBar,
  TextStyle,
  ViewStyle,
} from "react-native"
import { RectButton, Swipeable } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { mix, mixColor } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import { Button, Card, ExpandableSection, Text, View } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { Screen } from "../../components/screen/screen"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const navigation = useNavigation<NavigationProps<"UserProfileTabs">["navigation"]>()
  const [refreshing, setRefreshing] = React.useState(false)

  const { data, query } = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      { where: { bookmarked: { eq: true } } },
      nodes(userJokeHistoryModelPrimitives.id.rating.bookmarked.joke((j) => j.id.title.body)),
      { fetchPolicy: "no-cache" },
    ),
  )

  const hasData =
    typeof data?.userJokeHistoryByUserId !== "undefined" &&
    data.userJokeHistoryByUserId.nodes.length > 0

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await query?.refetch()
    setRefreshing(false)
  }, [])

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <StatusBar barStyle="dark-content" />

      {hasData ? (
        <FlatList
          refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
          data={data.userJokeHistoryByUserId.nodes}
          renderItem={({ item: bookmark }) => <Bookmark key={bookmark.id} {...{ bookmark }} />}
        />
      ) : (
        <EmptyState
          title="No Bookmarks!"
          body={
            <>
              <Text style={BODY} text80 center>
                {"It appears you've not bookmarked any jokes.\n Make sure to press  "}
                <Button
                  round
                  style={ACTION_BUTTON}
                  activeOpacity={0.7}
                  iconSource={() => <BookmarkButton bookmarked size={13} />}
                />
                {"  to save them here!"}
              </Text>
            </>
          }
          ctaText="Go save some jokes!"
          image={<EmptyStateImage />}
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
}
const BODY: TextStyle = {
  lineHeight: 28,
}
const ACTION_BUTTON: ViewStyle = {
  justifyContent: "center",
  backgroundColor: "hsl(0, 0%, 93%)",
  borderRadius: 75,
  shadowColor: "grey",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  position: "relative",
  alignItems: "center",
  padding: 5,
  width: 25,
  height: 25,
}

type BookmarkProps = {
  bookmark: UserJokeHistoryModelType
}
export const Bookmark = observer(function Bookmark(props: BookmarkProps) {
  const { bookmark } = props
  const [expanded, setExpanded] = React.useState(false)
  const query = useQuery()
  const open = useSharedValue(false)
  const progress = useDerivedValue(() => (expanded ? withSpring(1) : withTiming(0)), [expanded])

  const handleDelete = () => {
    query.setQuery((store) =>
      store.mutateDeleteBookmark({ id: bookmark.id }, undefined, () => {
        query.store.removeChild(bookmark)
      }),
    )
  }

  return (
    <Card collapsable={false} marginV-s3>
      <Swipeable
        friction={2}
        renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
          <RenderRightActions {...{ progressAnimatedValue, dragAnimatedValue, handleDelete }} />
        )}
      >
        <ExpandableSection
          {...{ expanded }}
          top={false}
          onPress={() => setExpanded((c) => !c)}
          sectionHeader={
            <View style={CONTAINER} padding-s4 marginV-s3 row centerV spread>
              <View>
                <Text style={TITLE} h4 bold numberOfLines={open.value ? undefined : 1}>
                  {bookmark.joke.title}
                </Text>
              </View>
              <Chevron {...{ progress }} />
            </View>
          }
        >
          <View style={ITEMS} paddingH-s4>
            <Text bold text={bookmark.joke.body} style={JOKE_BODY} />
            <Link jokeId={bookmark.joke.id} style={SHARE}>
              <Text text="Share" style={SHARE_TEXT} />
            </Link>
          </View>
        </ExpandableSection>
      </Swipeable>
    </Card>
  )
})

const CONTAINER: ViewStyle = {
  backgroundColor: "white",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
}
const JOKE_BODY: TextStyle = {
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
      { text: "Cancel" },
      { text: "Ok", onPress: handleDelete },
    ])
  }

  return (
    <RectButton {...{ onPress }} style={DELETE_BUTTON}>
      <RNAnimated.View style={[TRASH_CAN, { transform: [{ translateX: trans }] }]}>
        <TrashCan scale={1} fill={color.error} />
      </RNAnimated.View>
    </RectButton>
  )
}

const DELETE_BUTTON: ViewStyle = {
  paddingHorizontal: spacing[2],
}

const TRASH_CAN: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}

const size = 30

interface ChevronProps {
  progress: Animated.SharedValue<number>
}
const Chevron = ({ progress }: ChevronProps) => {
  const style = useAnimatedStyle(() => ({
    backgroundColor: mixColor(progress.value, "#525251", "#e45645") as string,
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }))
  return (
    <Animated.View style={[ARROW_CONTAINER, style]}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M6 9l6 6 6-6" />
      </Svg>
    </Animated.View>
  )
}

export default Chevron

const ARROW_CONTAINER: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#525251",
  borderRadius: size / 2,
  borderWidth: 1,
  height: size,
  justifyContent: "center",
  width: size,
}
const TITLE: TextStyle = {
  flexWrap: "wrap",
  fontSize: 16,
  fontWeight: "bold",
}
const ITEMS: ViewStyle = {
  overflow: "hidden",
}
