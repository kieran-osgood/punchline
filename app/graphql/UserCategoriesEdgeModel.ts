import { Instance } from "mobx-state-tree"
import { UserCategoriesEdgeModelBase } from "./UserCategoriesEdgeModel.base"

/* The TypeScript type of an instance of UserCategoriesEdgeModel */
export interface UserCategoriesEdgeModelType
  extends Instance<typeof UserCategoriesEdgeModel.Type> {}

/* A graphql query fragment builders for UserCategoriesEdgeModel */
export {
  selectFromUserCategoriesEdge,
  userCategoriesEdgeModelPrimitives,
  UserCategoriesEdgeModelSelector,
} from "./UserCategoriesEdgeModel.base"

/**
 * UserCategoriesEdgeModel
 *
 * An edge in a connection.
 */
export const UserCategoriesEdgeModel = UserCategoriesEdgeModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
}))
