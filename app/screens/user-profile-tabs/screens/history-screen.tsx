import { jokeModelPrimitives, nodes, useQuery } from "app/graphql"
import { userJokeHistoryModelPrimitives } from "app/graphql/UserJokeHistoryModel"
import { JokeBookmarkHistoryList } from "app/screens/user-profile-tabs/joke-bookmark-history-list"
import { observer } from "mobx-react-lite"
import React from "react"

export const HistoryScreen = observer(function HistoryScreen() {
  const query = useQuery(
    (store) =>
      store.queryUserJokeHistoryByUserId(
        {},
        nodes(userJokeHistoryModelPrimitives, `joke{${jokeModelPrimitives.toString()}}`),
      ),
    { fetchPolicy: "no-cache" },
  )

  const type = "HISTORY"

  return <JokeBookmarkHistoryList {...{ type, query }} />
})
