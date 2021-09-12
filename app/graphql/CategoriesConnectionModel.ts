import { Instance } from "mobx-state-tree"
import { CategoriesConnectionModelBase } from "./CategoriesConnectionModel.base"

/* The TypeScript type of an instance of CategoriesConnectionModel */
export interface CategoriesConnectionModelType extends Instance<typeof CategoriesConnectionModel.Type> {}

/* A graphql query fragment builders for CategoriesConnectionModel */
export { selectFromCategoriesConnection, categoriesConnectionModelPrimitives, CategoriesConnectionModelSelector } from "./CategoriesConnectionModel.base"

/**
 * CategoriesConnectionModel
 *
 * A connection to a list of items.
 */
export const CategoriesConnectionModel = CategoriesConnectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
