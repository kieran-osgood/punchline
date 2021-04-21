import { Instance } from "mobx-state-tree"
import { CategoryConnectionModelBase } from "./CategoryConnectionModel.base"

/* The TypeScript type of an instance of CategoryConnectionModel */
export interface CategoryConnectionModelType extends Instance<typeof CategoryConnectionModel.Type> {}

/* A graphql query fragment builders for CategoryConnectionModel */
export { selectFromCategoryConnection, categoryConnectionModelPrimitives, CategoryConnectionModelSelector } from "./CategoryConnectionModel.base"

/**
 * CategoryConnectionModel
 *
 * A connection to a list of items.
 */
export const CategoryConnectionModel = CategoryConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
