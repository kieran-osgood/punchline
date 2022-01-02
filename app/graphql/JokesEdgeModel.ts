import { Instance } from "mobx-state-tree"
import { JokesEdgeModelBase } from "./JokesEdgeModel.base"

/* The TypeScript type of an instance of JokesEdgeModel */
export interface JokesEdgeModelType extends Instance<typeof JokesEdgeModel.Type> {}

/* A graphql query fragment builders for JokesEdgeModel */
export {
  selectFromJokesEdge,
  jokesEdgeModelPrimitives,
  JokesEdgeModelSelector,
} from "./JokesEdgeModel.base"

/**
 * JokesEdgeModel
 *
 * An edge in a connection.
 */
export const JokesEdgeModel = JokesEdgeModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
}))
