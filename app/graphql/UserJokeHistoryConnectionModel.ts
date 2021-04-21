import { Instance } from "mobx-state-tree"
import { UserJokeHistoryConnectionModelBase } from "./UserJokeHistoryConnectionModel.base"

/* The TypeScript type of an instance of UserJokeHistoryConnectionModel */
export interface UserJokeHistoryConnectionModelType extends Instance<typeof UserJokeHistoryConnectionModel.Type> {}

/* A graphql query fragment builders for UserJokeHistoryConnectionModel */
export { selectFromUserJokeHistoryConnection, userJokeHistoryConnectionModelPrimitives, UserJokeHistoryConnectionModelSelector } from "./UserJokeHistoryConnectionModel.base"

/**
 * UserJokeHistoryConnectionModel
 *
 * A connection to a list of items.
 */
export const UserJokeHistoryConnectionModel = UserJokeHistoryConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
