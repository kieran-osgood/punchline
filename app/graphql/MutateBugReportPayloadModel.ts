import { Instance } from "mobx-state-tree"
import { MutateBugReportPayloadModelBase } from "./MutateBugReportPayloadModel.base"

/* The TypeScript type of an instance of MutateBugReportPayloadModel */
export interface MutateBugReportPayloadModelType extends Instance<typeof MutateBugReportPayloadModel.Type> {}

/* A graphql query fragment builders for MutateBugReportPayloadModel */
export { selectFromMutateBugReportPayload, mutateBugReportPayloadModelPrimitives, MutateBugReportPayloadModelSelector } from "./MutateBugReportPayloadModel.base"

/**
 * MutateBugReportPayloadModel
 */
export const MutateBugReportPayloadModel = MutateBugReportPayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
