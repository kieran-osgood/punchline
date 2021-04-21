import { Instance } from "mobx-state-tree"
import { RateJokePayloadModelBase } from "./RateJokePayloadModel.base"

/* The TypeScript type of an instance of RateJokePayloadModel */
export interface RateJokePayloadModelType extends Instance<typeof RateJokePayloadModel.Type> {}

/* A graphql query fragment builders for RateJokePayloadModel */
export { selectFromRateJokePayload, rateJokePayloadModelPrimitives, RateJokePayloadModelSelector } from "./RateJokePayloadModel.base"

/**
 * RateJokePayloadModel
 */
export const RateJokePayloadModel = RateJokePayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
