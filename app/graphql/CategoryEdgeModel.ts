import { Instance } from "mobx-state-tree"
import { CategoryEdgeModelBase } from "./CategoryEdgeModel.base"

/* The TypeScript type of an instance of CategoryEdgeModel */
export interface CategoryEdgeModelType extends Instance<typeof CategoryEdgeModel.Type> {}

/* A graphql query fragment builders for CategoryEdgeModel */
export { selectFromCategoryEdge, categoryEdgeModelPrimitives, CategoryEdgeModelSelector } from "./CategoryEdgeModel.base"

/**
 * CategoryEdgeModel
 *
 * An edge in a connection.
 */
export const CategoryEdgeModel = CategoryEdgeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
