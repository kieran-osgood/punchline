import { Instance } from "mobx-state-tree"
import { UserJokeHistoryByUserIdConnectionModelBase } from "./UserJokeHistoryByUserIdConnectionModel.base"

/* The TypeScript type of an instance of UserJokeHistoryByUserIdConnectionModel */
export interface UserJokeHistoryByUserIdConnectionModelType extends Instance<typeof UserJokeHistoryByUserIdConnectionModel.Type> {}

/* A graphql query fragment builders for UserJokeHistoryByUserIdConnectionModel */
export { selectFromUserJokeHistoryByUserIdConnection, userJokeHistoryByUserIdConnectionModelPrimitives, UserJokeHistoryByUserIdConnectionModelSelector } from "./UserJokeHistoryByUserIdConnectionModel.base"

/**
 * UserJokeHistoryByUserIdConnectionModel
 *
 * A connection to a list of items.
 */
export const UserJokeHistoryByUserIdConnectionModel = UserJokeHistoryByUserIdConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
