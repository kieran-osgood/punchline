import { RootStoreType, SortEnumType } from "app/graphql"
import { UserJokeHistoryFilterInput } from "app/graphql/RootStore.base"
import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RootStore } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */
export const UserJokeHistoryApiStoreModel = types
  .model("UserJokeHistoryApiStore")
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
    get api(): RootStoreType {
      return this.root.apiStore.api
    },
  }))
  .views((self) => ({
    get bookmarkedJokes() {
      return [...self.api.userJokeHistories.values()].filter((x) => x.bookmarked)
    },
    get historyJokes() {
      return [...self.api.userJokeHistories.values()]
    },
  }))
  .actions((self) => ({
    fetchUserJokeHistory({
      after,
      first = 25,
      where,
    }: {
      after?: string | undefined
      first?: number | undefined
      where?: UserJokeHistoryFilterInput | undefined
    }) {
      return self.api.queryUserJokeHistoryByUserId(
        { order: [{ createdAt: SortEnumType.DESC }], first, after, where },
        (q) =>
          q
            .pageInfo((p) => p.hasNextPage.hasPreviousPage.startCursor.endCursor)
            .edges((e) =>
              e.cursor.node((n) => n.id.rating.bookmarked.joke((j) => j.id.title.body)),
            ),
      )
    },
  }))
  .actions((self) => ({
    fetchInitialHistory() {
      return self.fetchUserJokeHistory({})
    },
    fetchMoreHistory(after: string) {
      return self.fetchUserJokeHistory({ after, first: 50 })
    },
    fetchInitialBookmarks() {
      return self.fetchUserJokeHistory({
        where: { bookmarked: { eq: true } },
      })
    },
    fetchMoreBookmarks(after: string) {
      return self.fetchUserJokeHistory({
        where: { bookmarked: { eq: true } },
        after,
        first: 50,
      })
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserJokeHistoryApiStoreType = Instance<typeof UserJokeHistoryApiStoreModel>
export interface UserJokeHistoryApiStore extends UserJokeHistoryApiStoreType {}
type UserJokeHistoryApiStoreSnapshotType = SnapshotOut<typeof UserJokeHistoryApiStoreModel>
export interface UserJokeHistoryApiStoreSnapshot extends UserJokeHistoryApiStoreSnapshotType {}
export const createUserJokeHistoryApiStoreDefaultModel = () =>
  types.optional(UserJokeHistoryApiStoreModel, {})
