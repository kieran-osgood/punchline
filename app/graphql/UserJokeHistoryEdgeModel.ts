import { Instance } from "mobx-state-tree"
import { UserJokeHistoryEdgeModelBase } from "./UserJokeHistoryEdgeModel.base"

/* The TypeScript type of an instance of UserJokeHistoryEdgeModel */
export interface UserJokeHistoryEdgeModelType extends Instance<typeof UserJokeHistoryEdgeModel.Type> {}

/* A graphql query fragment builders for UserJokeHistoryEdgeModel */
export { selectFromUserJokeHistoryEdge, userJokeHistoryEdgeModelPrimitives, UserJokeHistoryEdgeModelSelector } from "./UserJokeHistoryEdgeModel.base"

/**
 * UserJokeHistoryEdgeModel
 *
 * An edge in a connection.
 */
export const UserJokeHistoryEdgeModel = UserJokeHistoryEdgeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
