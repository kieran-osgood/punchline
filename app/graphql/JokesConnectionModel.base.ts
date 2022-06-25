/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { JokesEdgeModel, JokesEdgeModelType } from "./JokesEdgeModel"
import { JokesEdgeModelSelector } from "./JokesEdgeModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { PageInfoModelSelector } from "./PageInfoModel.base"
import { RootStoreType } from "./index"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<JokeModelType>
}

/**
 * JokesConnectionBase
 * auto generated base class for the model JokesConnectionModel.
 *
 * A connection to a list of items.
 */
export const JokesConnectionModelBase = withTypedRefs<Refs>()(
  ModelBase.named("JokesConnection")
    .props({
      __typename: types.optional(types.literal("JokesConnection"), "JokesConnection"),
      /** Information to aid in pagination. */
      pageInfo: types.union(
        types.undefined,
        types.late((): any => PageInfoModel),
      ),
      /** A list of edges. */
      edges: types.union(
        types.undefined,
        types.null,
        types.array(types.late((): any => JokesEdgeModel)),
      ),
      /** A flattened list of the nodes. */
      nodes: types.union(
        types.undefined,
        types.null,
        types.array(MSTGQLRef(types.late((): any => JokeModel))),
      ),
      totalCount: types.union(types.undefined, types.integer),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class JokesConnectionModelSelector extends QueryBuilder {
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
      | JokesEdgeModelSelector
      | ((selector: JokesEdgeModelSelector) => JokesEdgeModelSelector),
  ) {
    return this.__child(`edges`, JokesEdgeModelSelector, builder)
  }
  nodes(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`nodes`, JokeModelSelector, builder)
  }
}
export function selectFromJokesConnection() {
  return new JokesConnectionModelSelector()
}

export const jokesConnectionModelPrimitives = selectFromJokesConnection().totalCount
