import { Instance } from "mobx-state-tree"
import { MutateUserJokeHistoryPayloadModelBase } from "./MutateUserJokeHistoryPayloadModel.base"

/* The TypeScript type of an instance of MutateUserJokeHistoryPayloadModel */
export interface MutateUserJokeHistoryPayloadModelType
  extends Instance<typeof MutateUserJokeHistoryPayloadModel.Type> {}

/* A graphql query fragment builders for MutateUserJokeHistoryPayloadModel */
export {
  selectFromMutateUserJokeHistoryPayload,
  mutateUserJokeHistoryPayloadModelPrimitives,
  MutateUserJokeHistoryPayloadModelSelector,
} from "./MutateUserJokeHistoryPayloadModel.base"

/**
 * MutateUserJokeHistoryPayloadModel
 */
export const MutateUserJokeHistoryPayloadModel = MutateUserJokeHistoryPayloadModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
  }),
)
