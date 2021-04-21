import { Instance } from "mobx-state-tree"
import { UserJokeHistoryModelBase } from "./UserJokeHistoryModel.base"

/* The TypeScript type of an instance of UserJokeHistoryModel */
export interface UserJokeHistoryModelType extends Instance<typeof UserJokeHistoryModel.Type> {}

/* A graphql query fragment builders for UserJokeHistoryModel */
export { selectFromUserJokeHistory, userJokeHistoryModelPrimitives, UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"

/**
 * UserJokeHistoryModel
 */
export const UserJokeHistoryModel = UserJokeHistoryModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
