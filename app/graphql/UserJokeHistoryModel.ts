import { ApiStoreType } from "app/graphql"
import { RootStore } from "app/models"
import { getRoot, Instance } from "mobx-state-tree"
import { UserJokeHistoryModelBase } from "./UserJokeHistoryModel.base"
/* The TypeScript type of an instance of UserJokeHistoryModel */
export interface UserJokeHistoryModelType extends Instance<typeof UserJokeHistoryModel.Type> {}
/* A graphql query fragment builders for UserJokeHistoryModel */
export {
  selectFromUserJokeHistory,
  userJokeHistoryModelPrimitives,
  UserJokeHistoryModelSelector,
} from "./UserJokeHistoryModel.base"

/**
 * UserJokeHistoryModel
 */
export const UserJokeHistoryModel = UserJokeHistoryModelBase.views((self) => ({
  get root(): RootStore {
    return getRoot(self)
  },
  get api(): ApiStoreType {
    return this.root.apiStore
  },
})).actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
  toggleBookmark() {
    const query = self.api.mutateUpdateUserJokeHistory(
      {
        input: {
          id: self.id,
          bookmarked: !self.bookmarked,
        },
      },
      (res) => res.userJokeHistory((ujh) => ujh.id.bookmarked.rating),
    )

    return query
  },
}))
