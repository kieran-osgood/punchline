import { SortEnumType, useQuery } from "app/graphql"
import { UserJokeList } from "app/screens/user-profile-tabs/user-joke-list"
import { observer } from "mobx-react-lite"
import React from "react"

export const BookmarksScreen = observer(function BookmarksScreen() {
  const query = useQuery((store) =>
    store.queryUserJokeHistoryByUserId(
      { where: { bookmarked: { eq: true } }, order: [{ createdAt: SortEnumType.DESC }], first: 5 },
      (q) =>
        q
          .pageInfo((p) => p.hasNextPage.hasPreviousPage.startCursor.endCursor)
          .nodes((n) => n.id.rating.bookmarked.joke((j) => j.id.title.body)),
    ),
  )

  const type = "BOOKMARK"

  return <UserJokeList {...{ type, query }} />
})
