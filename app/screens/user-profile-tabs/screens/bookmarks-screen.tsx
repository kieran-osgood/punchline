import { nodes, useQuery, userJokeHistoryModelPrimitives } from "app/graphql"
import { UserJokeList } from "app/screens/user-profile-tabs/joke-bookmark-history-list"
import { observer } from "mobx-react-lite"
import React from "react"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const query = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      { where: { bookmarked: { eq: true } } },
      nodes(userJokeHistoryModelPrimitives.id.rating.bookmarked.joke((j) => j.id.title.body)),
    ),
  )

  const type = "BOOKMARK"

  return <UserJokeList {...{ type, query }} />
})
