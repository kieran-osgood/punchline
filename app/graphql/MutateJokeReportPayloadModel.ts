import { Instance } from "mobx-state-tree"
import { MutateJokeReportPayloadModelBase } from "./MutateJokeReportPayloadModel.base"

/* The TypeScript type of an instance of MutateJokeReportPayloadModel */
export interface MutateJokeReportPayloadModelType extends Instance<typeof MutateJokeReportPayloadModel.Type> {}

/* A graphql query fragment builders for MutateJokeReportPayloadModel */
export { selectFromMutateJokeReportPayload, mutateJokeReportPayloadModelPrimitives, MutateJokeReportPayloadModelSelector } from "./MutateJokeReportPayloadModel.base"

/**
 * MutateJokeReportPayloadModel
 */
export const MutateJokeReportPayloadModel = MutateJokeReportPayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
