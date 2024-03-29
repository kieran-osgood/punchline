/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { RootStoreType } from "./index"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  node: CategoryModelType
}

/**
 * UserCategoriesEdgeBase
 * auto generated base class for the model UserCategoriesEdgeModel.
 *
 * An edge in a connection.
 */
export const UserCategoriesEdgeModelBase = withTypedRefs<Refs>()(
  ModelBase.named("UserCategoriesEdge")
    .props({
      __typename: types.optional(types.literal("UserCategoriesEdge"), "UserCategoriesEdge"),
      /** A cursor for use in pagination. */
      cursor: types.union(types.undefined, types.string),
      /** The item at the end of the edge. */
      node: types.union(types.undefined, MSTGQLRef(types.late((): any => CategoryModel))),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class UserCategoriesEdgeModelSelector extends QueryBuilder {
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
export function selectFromUserCategoriesEdge() {
  return new UserCategoriesEdgeModelSelector()
}

export const userCategoriesEdgeModelPrimitives = selectFromUserCategoriesEdge().cursor
