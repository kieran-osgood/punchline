import { Instance } from "mobx-state-tree"
import { JokesConnectionModelBase } from "./JokesConnectionModel.base"

/* The TypeScript type of an instance of JokesConnectionModel */
export interface JokesConnectionModelType extends Instance<typeof JokesConnectionModel.Type> {}

/* A graphql query fragment builders for JokesConnectionModel */
export {
  selectFromJokesConnection,
  jokesConnectionModelPrimitives,
  JokesConnectionModelSelector,
} from "./JokesConnectionModel.base"

/**
 * JokesConnectionModel
 *
 * A connection to a list of items.
 */
export const JokesConnectionModel = JokesConnectionModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
}))
