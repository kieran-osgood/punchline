/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { PageInfoModelSelector } from "./PageInfoModel.base"
import { UserJokeHistoryEdgeModel, UserJokeHistoryEdgeModelType } from "./UserJokeHistoryEdgeModel"
import { UserJokeHistoryEdgeModelSelector } from "./UserJokeHistoryEdgeModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<UserJokeHistoryModelType>;
}

/**
 * UserJokeHistoryConnectionBase
 * auto generated base class for the model UserJokeHistoryConnectionModel.
 *
 * A connection to a list of items.
 */
export const UserJokeHistoryConnectionModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UserJokeHistoryConnection')
  .props({
    __typename: types.optional(types.literal("UserJokeHistoryConnection"), "UserJokeHistoryConnection"),
    /** Information to aid in pagination. */
    pageInfo: types.union(types.undefined, types.late((): any => PageInfoModel)),
    /** A list of edges. */
    edges: types.union(types.undefined, types.null, types.array(types.late((): any => UserJokeHistoryEdgeModel))),
    /** A flattened list of the nodes. */
    nodes: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late((): any => UserJokeHistoryModel)))),
    totalCount: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserJokeHistoryConnectionModelSelector extends QueryBuilder {
  get totalCount() { return this.__attr(`totalCount`) }
  pageInfo(builder?: string | PageInfoModelSelector | ((selector: PageInfoModelSelector) => PageInfoModelSelector)) { return this.__child(`pageInfo`, PageInfoModelSelector, builder) }
  edges(builder?: string | UserJokeHistoryEdgeModelSelector | ((selector: UserJokeHistoryEdgeModelSelector) => UserJokeHistoryEdgeModelSelector)) { return this.__child(`edges`, UserJokeHistoryEdgeModelSelector, builder) }
  nodes(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__child(`nodes`, UserJokeHistoryModelSelector, builder) }
}
export function selectFromUserJokeHistoryConnection() {
  return new UserJokeHistoryConnectionModelSelector()
}

export const userJokeHistoryConnectionModelPrimitives = selectFromUserJokeHistoryConnection().totalCount
