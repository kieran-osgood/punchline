import { useNavigation } from "@react-navigation/native"
import { ShareLink } from "app/components/joke-options-sheet/joke-options-sheet"
import { useQuery, UserJokeHistoryModelType } from "app/graphql"
import { NavigationProps } from "app/navigators"
import { ACTION_BUTTON } from "app/screens"
import { EmptyStateImage, TrashCan } from "assets/images"
import { BookmarkButton, EmptyState, Screen } from "components"
import { observer, Observer } from "mobx-react-lite"
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
import { mix } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import { Button, Card, ExpandableSection, Text, ThemeManager, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

const renderItem = ({ item: bookmark }: { item: UserJokeHistoryModelType }) => (
  <UserJoke key={bookmark.id} {...{ bookmark }} />
)

export type UserJokeListProps = {
  type: "HISTORY" | "BOOKMARK"
  fetchMore: () => void
  refetch: () => void
  data: UserJokeHistoryModelType[]
}
export const UserJokeList = observer(function JokeBookmarkHistoryList(props: UserJokeListProps) {
  const { type, fetchMore, refetch, data } = props
  const navigation = useNavigation<NavigationProps<"UserProfileTabs">["navigation"]>()
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <StatusBar barStyle="dark-content" />
      {data.length > 0 ? (
        <FlatList
          refreshControl={<RefreshControl {...{ refreshing, onRefresh }} />}
          data={data}
          renderItem={renderItem}
          onEndReachedThreshold={0.65}
          onEndReached={fetchMore}
          initialNumToRender={15}
        />
      ) : (
        <EmptyState
          {...{ type }}
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

type UserJokeProps = {
  bookmark: UserJokeHistoryModelType
}
export const UserJoke = observer(function UserJoke(props: UserJokeProps) {
  const { bookmark } = props

  const [expanded, setExpanded] = React.useState(false)
  const query = useQuery()
  const open = useSharedValue(false)
  const progress = useDerivedValue(() => (expanded ? withSpring(1) : withTiming(0)), [expanded])

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!bookmark || !bookmark.joke) return null

  const handleDelete = () => {
    query.setQuery((store) =>
      store.mutateDeleteUserJokeHistory({ id: bookmark.id }, undefined, () => {
        query.store.removeChild(bookmark)
      }),
    )
  }

  const onPress = () => bookmark.toggleBookmark()

  return (
    <Card collapsable={false} marginV-s1>
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
            <View style={CONTAINER} paddingV-s1 paddingH-s4 marginV-s3 row centerV spread>
              <View>
                <Text style={TITLE} text70 bold numberOfLines={open.value ? undefined : 1}>
                  {bookmark.joke.title}
                </Text>
              </View>

              <Chevron {...{ progress }} />
            </View>
          }
        >
          <View marginB-s4 paddingH-s4 centerV>
            <Text color={ThemeManager.titleColor} text80R>
              {bookmark.joke.body}
            </Text>
            <View row centerV spread marginT-s3>
              <Button
                {...{ onPress }}
                round
                style={ACTION_BUTTON}
                iconSource={() => (
                  <Observer>
                    {() => <BookmarkButton size={24} bookmarked={bookmark.bookmarked} />}
                  </Observer>
                )}
              />

              <ShareLink jokeId={bookmark.joke.id} style={SHARE}>
                <Text style={SHARE_TEXT}>{"Share"}</Text>
              </ShareLink>
            </View>
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
const SHARE: ViewStyle = {
  backgroundColor: "transparent",
  borderColor: "#000",
  borderWidth: 1.5,
  borderRadius: 5,
  width: "50%",
  alignSelf: "flex-end",
  paddingVertical: 8,
}
const SHARE_TEXT: TextStyle = {
  color: "#000",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  paddingVertical: spacing[0],
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
    // backgroundColor: mixColor(progress.value, "#525251", "#e45645") as string,
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }))
  return (
    <Animated.View style={[ARROW_CONTAINER, style]}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={ThemeManager.titleColor}
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
  height: size,
  justifyContent: "center",
  width: size,
}
const TITLE: TextStyle = {
  flexWrap: "wrap",
  fontSize: 16,
  fontWeight: "bold",
}
