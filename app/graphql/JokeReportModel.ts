import { Instance } from "mobx-state-tree"
import { JokeReportModelBase } from "./JokeReportModel.base"

/* The TypeScript type of an instance of JokeReportModel */
export interface JokeReportModelType extends Instance<typeof JokeReportModel.Type> {}

/* A graphql query fragment builders for JokeReportModel */
export {
  selectFromJokeReport,
  jokeReportModelPrimitives,
  JokeReportModelSelector,
} from "./JokeReportModel.base"

/**
 * JokeReportModel
 */
export const JokeReportModel = JokeReportModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
}))
