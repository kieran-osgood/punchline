/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  reportingUser: UserModelType
  reportedJoke: JokeModelType
}

/**
 * JokeReportBase
 * auto generated base class for the model JokeReportModel.
 */
export const JokeReportModelBase = withTypedRefs<Refs>()(
  ModelBase.named("JokeReport")
    .props({
      __typename: types.optional(types.literal("JokeReport"), "JokeReport"),
      id: types.identifier,
      reportingUser: types.union(
        types.undefined,
        types.null,
        MSTGQLRef(types.late((): any => UserModel)),
      ),
      reportedJoke: types.union(
        types.undefined,
        types.null,
        MSTGQLRef(types.late((): any => JokeModel)),
      ),
      description: types.union(types.undefined, types.string),
      createdAt: types.union(types.undefined, types.frozen()),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class JokeReportModelSelector extends QueryBuilder {
  get id() {
    return this.__attr(`id`)
  }
  get description() {
    return this.__attr(`description`)
  }
  get createdAt() {
    return this.__attr(`createdAt`)
  }
  reportingUser(
    builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector),
  ) {
    return this.__child(`reportingUser`, UserModelSelector, builder)
  }
  reportedJoke(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`reportedJoke`, JokeModelSelector, builder)
  }
}
export function selectFromJokeReport() {
  return new JokeReportModelSelector()
}

export const jokeReportModelPrimitives = selectFromJokeReport().description.createdAt
