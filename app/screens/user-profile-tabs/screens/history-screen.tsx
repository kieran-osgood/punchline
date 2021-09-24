import { PAGINATION_START } from "app/models/api-store/api-store"
import { useStores } from "app/models/root-store/root-store-context"
import { UserJokeList } from "app/screens/user-profile-tabs/user-joke-list"
import { observer } from "mobx-react-lite"
import * as React from "react"

export const HistoryScreen = observer(function HistoryScreen() {
  const [page, setPage] = React.useState(PAGINATION_START)
  const {
    apiStore: { userJokeHistoryApi },
  } = useStores()

  const [query, setQuery] = React.useState(userJokeHistoryApi.fetchInitialHistory)

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

  const type = "HISTORY"

  return (
    <UserJokeList
      {...{ type, fetchMore }}
      data={userJokeHistoryApi.historyJokes}
      refetch={query.refetch}
    />
  )
})
