import { Instance } from "mobx-state-tree"
import { UserPayloadModelBase } from "./UserPayloadModel.base"

/* The TypeScript type of an instance of UserPayloadModel */
export interface UserPayloadModelType extends Instance<typeof UserPayloadModel.Type> {}

/* A graphql query fragment builders for UserPayloadModel */
export { selectFromUserPayload, userPayloadModelPrimitives, UserPayloadModelSelector } from "./UserPayloadModel.base"

/**
 * UserPayloadModel
 */
export const UserPayloadModel = UserPayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
