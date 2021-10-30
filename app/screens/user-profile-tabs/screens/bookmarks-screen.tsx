import auth from "@react-native-firebase/auth"
import { PAGINATION_START, useStores } from "app/models"
import { UserJokeList } from "app/screens/user-profile-tabs/components/user-joke-list"
import { observer } from "mobx-react-lite"
import * as React from "react"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const [page, setPage] = React.useState(PAGINATION_START)
  const {
    apiStore: { userJokeHistoryApi },
  } = useStores()

  const [query, setQuery] = React.useState(userJokeHistoryApi.fetchInitialHistory)
  const user = auth().currentUser

  React.useEffect(() => {
    if (user) setQuery(userJokeHistoryApi.fetchInitialHistory)
  }, [user, userJokeHistoryApi.fetchInitialHistory])

  React.useEffect(() => {
    let isSubscribed = true
    query.then((res) => {
      if (isSubscribed) setPage(res.userJokeHistoryByUserId.pageInfo.startCursor)
    })
    return () => {
      isSubscribed = false
    }
  }, [query, userJokeHistoryApi])

  const fetchMore = () => {
    setQuery(userJokeHistoryApi.fetchMoreHistory(page))
  }

  const type = "BOOKMARK"

  return (
    <UserJokeList
      {...{ type, fetchMore }}
      data={userJokeHistoryApi.bookmarkedJokes}
      refetch={query.refetch}
    />
  )
})
