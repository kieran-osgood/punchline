import { Instance } from "mobx-state-tree"
import { JokeConnectionModelBase } from "./JokeConnectionModel.base"

/* The TypeScript type of an instance of JokeConnectionModel */
export interface JokeConnectionModelType extends Instance<typeof JokeConnectionModel.Type> {}

/* A graphql query fragment builders for JokeConnectionModel */
export { selectFromJokeConnection, jokeConnectionModelPrimitives, JokeConnectionModelSelector } from "./JokeConnectionModel.base"

/**
 * JokeConnectionModel
 *
 * A connection to a list of items.
 */
export const JokeConnectionModel = JokeConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
