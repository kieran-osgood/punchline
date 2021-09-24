/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { ApiRootStoreType } from "./index"
import { ModelBase } from "./ModelBase"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  node: CategoryModelType
}

/**
 * CategoriesEdgeBase
 * auto generated base class for the model CategoriesEdgeModel.
 *
 * An edge in a connection.
 */
export const CategoriesEdgeModelBase = withTypedRefs<Refs>()(
  ModelBase.named("CategoriesEdge")
    .props({
      __typename: types.optional(types.literal("CategoriesEdge"), "CategoriesEdge"),
      /** A cursor for use in pagination. */
      cursor: types.union(types.undefined, types.string),
      /** The item at the end of the edge. */
      node: types.union(types.undefined, MSTGQLRef(types.late((): any => CategoryModel))),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<ApiRootStoreType>()
      },
    })),
)

export class CategoriesEdgeModelSelector extends QueryBuilder {
  get cursor() {
    return this.__attr(`cursor`)
  }
  node(
    builder?:
      | string
      | CategoryModelSelector
      | ((selector: CategoryModelSelector) => CategoryModelSelector),
  ) {
    return this.__child(`node`, CategoryModelSelector, builder)
  }
}
export function selectFromCategoriesEdge() {
  return new CategoriesEdgeModelSelector()
}

export const categoriesEdgeModelPrimitives = selectFromCategoriesEdge().cursor
