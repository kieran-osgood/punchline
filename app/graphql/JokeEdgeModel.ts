import { Instance } from "mobx-state-tree"
import { JokeEdgeModelBase } from "./JokeEdgeModel.base"

/* The TypeScript type of an instance of JokeEdgeModel */
export interface JokeEdgeModelType extends Instance<typeof JokeEdgeModel.Type> {}

/* A graphql query fragment builders for JokeEdgeModel */
export { selectFromJokeEdge, jokeEdgeModelPrimitives, JokeEdgeModelSelector } from "./JokeEdgeModel.base"

/**
 * JokeEdgeModel
 *
 * An edge in a connection.
 */
export const JokeEdgeModel = JokeEdgeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
