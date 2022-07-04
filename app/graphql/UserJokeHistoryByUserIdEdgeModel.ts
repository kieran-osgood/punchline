import { Instance } from "mobx-state-tree"
import { UserJokeHistoryByUserIdEdgeModelBase } from "./UserJokeHistoryByUserIdEdgeModel.base"

/* The TypeScript type of an instance of UserJokeHistoryByUserIdEdgeModel */
export interface UserJokeHistoryByUserIdEdgeModelType
  extends Instance<typeof UserJokeHistoryByUserIdEdgeModel.Type> {}

/* A graphql query fragment builders for UserJokeHistoryByUserIdEdgeModel */
export {
  selectFromUserJokeHistoryByUserIdEdge,
  userJokeHistoryByUserIdEdgeModelPrimitives,
  UserJokeHistoryByUserIdEdgeModelSelector,
} from "./UserJokeHistoryByUserIdEdgeModel.base"

/**
 * UserJokeHistoryByUserIdEdgeModel
 *
 * An edge in a connection.
 */
export const UserJokeHistoryByUserIdEdgeModel = UserJokeHistoryByUserIdEdgeModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
  }),
)
