import { Instance } from "mobx-state-tree"
import { UserErrorModelBase } from "./UserErrorModel.base"

/* The TypeScript type of an instance of UserErrorModel */
export interface UserErrorModelType extends Instance<typeof UserErrorModel.Type> {}

/* A graphql query fragment builders for UserErrorModel */
export { selectFromUserError, userErrorModelPrimitives, UserErrorModelSelector } from "./UserErrorModel.base"

/**
 * UserErrorModel
 */
export const UserErrorModel = UserErrorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
