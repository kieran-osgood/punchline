import { Instance, types } from "mobx-state-tree"
import { CategoryModelBase } from "./CategoryModel.base"

/* The TypeScript type of an instance of CategoryModel */
export interface CategoryModelType extends Instance<typeof CategoryModel.Type> {}

/* A graphql query fragment builders for CategoryModel */
export {
  categoryModelPrimitives,
  CategoryModelSelector,
  selectFromCategory,
} from "./CategoryModel.base"

/**
 * CategoryModel
 */
export const CategoryModel = CategoryModelBase.props({
  isActive: types.optional(types.boolean, false),
}).actions((self) => ({
  // This is an auto-generated example action.
  update(val: boolean) {
    self.isActive = val
  },
}))
