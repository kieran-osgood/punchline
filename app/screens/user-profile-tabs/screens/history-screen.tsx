import { jokeModelPrimitives, nodes, SortEnumType, useQuery } from "app/graphql"
import { userJokeHistoryModelPrimitives } from "app/graphql/UserJokeHistoryModel"
import { UserJokeList } from "app/screens/user-profile-tabs/user-joke-list"
import { observer } from "mobx-react-lite"
import React from "react"

export const HistoryScreen = observer(function HistoryScreen() {
  const query = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      { order: [{ createdAt: SortEnumType.DESC }] },
      nodes(userJokeHistoryModelPrimitives, `joke{${jokeModelPrimitives.toString()}}`),
    ),
  )

  const type = "HISTORY"

  return <UserJokeList {...{ type, query }} />
})
