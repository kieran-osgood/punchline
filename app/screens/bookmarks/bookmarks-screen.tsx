/* eslint-disable react-native/no-color-literals */
import { useNavigation } from "@react-navigation/native"
import {
  nodes,
  useQuery,
  userJokeHistoryModelPrimitives,
  UserJokeHistoryModelType,
} from "app/graphql"
import { NavigationProps } from "app/navigators"
import { TrashCan } from "assets/images/trash-can"
import { EmptyState, Link, Text } from "components"
import { observer } from "mobx-react-lite"
import React, { useCallback, useState } from "react"
import {
  Alert,
  Animated as RNAnimated,
  FlatList,
  LayoutChangeEvent,
  RefreshControl,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native"
import { RectButton, Swipeable } from "react-native-gesture-handler"
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { mix, mixColor } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import { Card, ExpandableSection, View } from "react-native-ui-lib"
import { color, spacing } from "theme"
import { Screen } from "../../components/screen/screen"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const navigation = useNavigation<NavigationProps<"UserProfileScreen">["navigation"]>()
  const [index, setIndex] = React.useState<number | null>(null)
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
      {hasData ? (
        <FlatList
          refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
          data={data.userJokeHistoryByUserId.nodes}
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
          title="No Bookmarks!"
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
type Size = { width: number; height: number } | null
const useComponentSize = (): [Size, typeof onLayout] => {
  const [size, setSize] = useState<Size>(null)

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

export const Bookmark = (props: BookmarkProps) => {
  const { bookmark, lastTouched, handlePress } = props
  const [expanded, setExpanded] = React.useState(false)
  const query = useQuery()

  const open = useSharedValue(false)
  const ref = useAnimatedRef<View>()
  const touched = useDerivedValue(() => Number(lastTouched), [lastTouched])
  const progress = useDerivedValue(() => (expanded ? withSpring(1) : withTiming(0)), [expanded])

  const handleDelete = () => {
    query.setQuery((store) =>
      store.mutateDeleteBookmark({ id: bookmark.id }, undefined, () => {
        query.store.removeChild(bookmark)
      }),
    )
  }

  return (
    <Card collapsable={false} ref={ref} marginV-s3>
      <Swipeable
        friction={2}
        renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
          <RenderRightActions {...{ progressAnimatedValue, dragAnimatedValue, handleDelete }} />
        )}
      >
        <ExpandableSection
          top={false}
          expanded={expanded}
          onPress={() => setExpanded((c) => !c)}
          sectionHeader={
            <View style={styles.container} padding-s4 marginV-s3 row centerV spread>
              <View>
                <Text style={styles.title} h4 bold numberOfLines={open.value ? undefined : 1}>
                  {bookmark.joke.title}
                </Text>
              </View>
              <Chevron {...{ progress }} />
            </View>
          }
        >
          <View style={styles.items} paddingH-s4>
            <Text bold text={bookmark.joke.body} style={BODY} />
            <Link jokeId={bookmark.joke.id} style={SHARE}>
              <Text text="Share" style={SHARE_TEXT} />
            </Link>
          </View>
        </ExpandableSection>
      </Swipeable>
    </Card>
  )
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
      { text: "Cancel" },
      { text: "Ok", onPress: handleDelete },
    ])
  }

  return (
    <RectButton
      {...{ onPress }}
      style={{
        paddingHorizontal: spacing[2],
      }}
    >
      <RNAnimated.View style={[TRASH_CAN, { transform: [{ translateX: trans }] }]}>
        <TrashCan scale={1} fill={color.error} />
      </RNAnimated.View>
    </RectButton>
  )
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
    <Animated.View style={[styles.arrowcontainer, style]}>
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

const styles = StyleSheet.create({
  arrowcontainer: {
    alignItems: "center",
    backgroundColor: "#525251",
    borderRadius: size / 2,
    borderWidth: 1,
    height: size,
    justifyContent: "center",
    width: size,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  items: {
    overflow: "hidden",
  },
  title: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "bold",
  },
})
