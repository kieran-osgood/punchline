import { Instance } from "mobx-state-tree"
import { JokeModelBase } from "./JokeModel.base"

/* The TypeScript type of an instance of JokeModel */
export interface JokeModelType extends Instance<typeof JokeModel.Type> {}

/* A graphql query fragment builders for JokeModel */
export { selectFromJoke, jokeModelPrimitives, JokeModelSelector } from "./JokeModel.base"

/**
 * JokeModel
 */
export const JokeModel = JokeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
