/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  node: UserJokeHistoryModelType;
}

/**
 * UserJokeHistoryEdgeBase
 * auto generated base class for the model UserJokeHistoryEdgeModel.
 *
 * An edge in a connection.
 */
export const UserJokeHistoryEdgeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UserJokeHistoryEdge')
  .props({
    __typename: types.optional(types.literal("UserJokeHistoryEdge"), "UserJokeHistoryEdge"),
    /** A cursor for use in pagination. */
    cursor: types.union(types.undefined, types.string),
    /** The item at the end of the edge. */
    node: types.union(types.undefined, MSTGQLRef(types.late((): any => UserJokeHistoryModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserJokeHistoryEdgeModelSelector extends QueryBuilder {
  get cursor() { return this.__attr(`cursor`) }
  node(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__child(`node`, UserJokeHistoryModelSelector, builder) }
}
export function selectFromUserJokeHistoryEdge() {
  return new UserJokeHistoryEdgeModelSelector()
}

export const userJokeHistoryEdgeModelPrimitives = selectFromUserJokeHistoryEdge().cursor
