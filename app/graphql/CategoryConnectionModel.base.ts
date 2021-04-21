/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CategoryEdgeModel, CategoryEdgeModelType } from "./CategoryEdgeModel"
import { CategoryEdgeModelSelector } from "./CategoryEdgeModel.base"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { PageInfoModelSelector } from "./PageInfoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<CategoryModelType>;
}

/**
 * CategoryConnectionBase
 * auto generated base class for the model CategoryConnectionModel.
 *
 * A connection to a list of items.
 */
export const CategoryConnectionModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CategoryConnection')
  .props({
    __typename: types.optional(types.literal("CategoryConnection"), "CategoryConnection"),
    /** Information to aid in pagination. */
    pageInfo: types.union(types.undefined, types.late((): any => PageInfoModel)),
    /** A list of edges. */
    edges: types.union(types.undefined, types.null, types.array(types.late((): any => CategoryEdgeModel))),
    /** A flattened list of the nodes. */
    nodes: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late((): any => CategoryModel)))),
    totalCount: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CategoryConnectionModelSelector extends QueryBuilder {
  get totalCount() { return this.__attr(`totalCount`) }
  pageInfo(builder?: string | PageInfoModelSelector | ((selector: PageInfoModelSelector) => PageInfoModelSelector)) { return this.__child(`pageInfo`, PageInfoModelSelector, builder) }
  edges(builder?: string | CategoryEdgeModelSelector | ((selector: CategoryEdgeModelSelector) => CategoryEdgeModelSelector)) { return this.__child(`edges`, CategoryEdgeModelSelector, builder) }
  nodes(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__child(`nodes`, CategoryModelSelector, builder) }
}
export function selectFromCategoryConnection() {
  return new CategoryConnectionModelSelector()
}

export const categoryConnectionModelPrimitives = selectFromCategoryConnection().totalCount
