/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { RootStoreType } from "./index"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  node: JokeModelType
}

/**
 * JokesEdgeBase
 * auto generated base class for the model JokesEdgeModel.
 *
 * An edge in a connection.
 */
export const JokesEdgeModelBase = withTypedRefs<Refs>()(
  ModelBase.named("JokesEdge")
    .props({
      __typename: types.optional(types.literal("JokesEdge"), "JokesEdge"),
      /** A cursor for use in pagination. */
      cursor: types.union(types.undefined, types.string),
      /** The item at the end of the edge. */
      node: types.union(types.undefined, MSTGQLRef(types.late((): any => JokeModel))),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class JokesEdgeModelSelector extends QueryBuilder {
  get cursor() {
    return this.__attr(`cursor`)
  }
  node(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`node`, JokeModelSelector, builder)
  }
}
export function selectFromJokesEdge() {
  return new JokesEdgeModelSelector()
}

export const jokesEdgeModelPrimitives = selectFromJokesEdge().cursor
