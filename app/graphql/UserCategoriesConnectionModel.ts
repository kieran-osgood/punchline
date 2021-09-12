import { Instance } from "mobx-state-tree"
import { UserCategoriesConnectionModelBase } from "./UserCategoriesConnectionModel.base"

/* The TypeScript type of an instance of UserCategoriesConnectionModel */
export interface UserCategoriesConnectionModelType extends Instance<typeof UserCategoriesConnectionModel.Type> {}

/* A graphql query fragment builders for UserCategoriesConnectionModel */
export { selectFromUserCategoriesConnection, userCategoriesConnectionModelPrimitives, UserCategoriesConnectionModelSelector } from "./UserCategoriesConnectionModel.base"

/**
 * UserCategoriesConnectionModel
 *
 * A connection to a list of items.
 */
export const UserCategoriesConnectionModel = UserCategoriesConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
