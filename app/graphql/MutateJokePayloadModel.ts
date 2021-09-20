import { Instance } from "mobx-state-tree"
import { MutateJokePayloadModelBase } from "./MutateJokePayloadModel.base"

/* The TypeScript type of an instance of MutateJokePayloadModel */
export interface MutateJokePayloadModelType extends Instance<typeof MutateJokePayloadModel.Type> {}

/* A graphql query fragment builders for MutateJokePayloadModel */
export { selectFromMutateJokePayload, mutateJokePayloadModelPrimitives, MutateJokePayloadModelSelector } from "./MutateJokePayloadModel.base"

/**
 * MutateJokePayloadModel
 */
export const MutateJokePayloadModel = MutateJokePayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
