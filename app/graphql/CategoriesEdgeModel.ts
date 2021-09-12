import { Instance } from "mobx-state-tree"
import { CategoriesEdgeModelBase } from "./CategoriesEdgeModel.base"

/* The TypeScript type of an instance of CategoriesEdgeModel */
export interface CategoriesEdgeModelType extends Instance<typeof CategoriesEdgeModel.Type> {}

/* A graphql query fragment builders for CategoriesEdgeModel */
export { selectFromCategoriesEdge, categoriesEdgeModelPrimitives, CategoriesEdgeModelSelector } from "./CategoriesEdgeModel.base"

/**
 * CategoriesEdgeModel
 *
 * An edge in a connection.
 */
export const CategoriesEdgeModel = CategoriesEdgeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
