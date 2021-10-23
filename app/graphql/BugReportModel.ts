import { Instance } from "mobx-state-tree"
import { BugReportModelBase } from "./BugReportModel.base"

/* The TypeScript type of an instance of BugReportModel */
export interface BugReportModelType extends Instance<typeof BugReportModel.Type> {}

/* A graphql query fragment builders for BugReportModel */
export { selectFromBugReport, bugReportModelPrimitives, BugReportModelSelector } from "./BugReportModel.base"

/**
 * BugReportModel
 */
export const BugReportModel = BugReportModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
