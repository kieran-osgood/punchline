import { useNavigation } from "@react-navigation/native"
import { useQuery, UserJokeHistoryModelType } from "app/graphql"
import { ACTION_BUTTON } from "app/screens"
import EmptyStateImage from "assets/images/empty-state-image"
import { TrashCan } from "assets/images/trash-can"
import { BookmarkButton, EmptyState, Link, Screen } from "components"
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
import { Button, Card, ExpandableSection, Text, ThemeManager, View } from "react-native-ui-lib"
import { color, spacing } from "theme"

export type UserJokeListProps = {
  type: "HISTORY" | "BOOKMARK"
  fetchMore: () => void
  refetch: () => void
  data: UserJokeHistoryModelType[]
}

export const UserJokeList = observer(function JokeBookmarkHistoryList(props: UserJokeListProps) {
  const { type, fetchMore, refetch, data } = props
  const navigation = useNavigation()
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
          renderItem={({ item: bookmark }) => <UserJoke key={bookmark.id} {...{ bookmark }} />}
          onEndReachedThreshold={0.65}
          onEndReached={fetchMore}
        />
      ) : (
        <EmptyState
          {...{ type }}
          image={<EmptyStateImage />}
          onPress={() =>
            navigation.navigate("MainNavigator", {
              screen: "JokeScreen",
              params: {},
            })
          }
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
                iconSource={() => <BookmarkButton size={24} {...{ bookmark }} />}
              />
              <Link jokeId={bookmark.joke.id} style={SHARE}>
                <Text style={SHARE_TEXT}>{"Share"}</Text>
              </Link>
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
