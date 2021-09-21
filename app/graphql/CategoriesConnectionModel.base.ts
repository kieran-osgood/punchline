/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { CategoriesEdgeModel } from "./CategoriesEdgeModel"
import { CategoriesEdgeModelSelector } from "./CategoriesEdgeModel.base"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { ApiStoreType } from "./index"
import { ModelBase } from "./ModelBase"
import { PageInfoModel } from "./PageInfoModel"
import { PageInfoModelSelector } from "./PageInfoModel.base"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<CategoryModelType>
}

/**
 * CategoriesConnectionBase
 * auto generated base class for the model CategoriesConnectionModel.
 *
 * A connection to a list of items.
 */
export const CategoriesConnectionModelBase = withTypedRefs<Refs>()(
  ModelBase.named("CategoriesConnection")
    .props({
      __typename: types.optional(types.literal("CategoriesConnection"), "CategoriesConnection"),
      /** Information to aid in pagination. */
      pageInfo: types.union(
        types.undefined,
        types.late((): any => PageInfoModel),
      ),
      /** A list of edges. */
      edges: types.union(
        types.undefined,
        types.null,
        types.array(types.late((): any => CategoriesEdgeModel)),
      ),
      /** A flattened list of the nodes. */
      nodes: types.union(
        types.undefined,
        types.null,
        types.array(MSTGQLRef(types.late((): any => CategoryModel))),
      ),
      totalCount: types.union(types.undefined, types.integer),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<ApiStoreType>()
      },
    })),
)

export class CategoriesConnectionModelSelector extends QueryBuilder {
  get totalCount() {
    return this.__attr(`totalCount`)
  }
  pageInfo(
    builder?:
      | string
      | PageInfoModelSelector
      | ((selector: PageInfoModelSelector) => PageInfoModelSelector),
  ) {
    return this.__child(`pageInfo`, PageInfoModelSelector, builder)
  }
  edges(
    builder?:
      | string
      | CategoriesEdgeModelSelector
      | ((selector: CategoriesEdgeModelSelector) => CategoriesEdgeModelSelector),
  ) {
    return this.__child(`edges`, CategoriesEdgeModelSelector, builder)
  }
  nodes(
    builder?:
      | string
      | CategoryModelSelector
      | ((selector: CategoryModelSelector) => CategoryModelSelector),
  ) {
    return this.__child(`nodes`, CategoryModelSelector, builder)
  }
}
export function selectFromCategoriesConnection() {
  return new CategoriesConnectionModelSelector()
}

export const categoriesConnectionModelPrimitives = selectFromCategoriesConnection().totalCount
