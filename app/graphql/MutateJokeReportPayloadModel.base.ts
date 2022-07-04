/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeReportModel, JokeReportModelType } from "./JokeReportModel"
import { JokeReportModelSelector } from "./JokeReportModel.base"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { RootStoreType } from "./index"

/**
 * MutateJokeReportPayloadBase
 * auto generated base class for the model MutateJokeReportPayloadModel.
 */
export const MutateJokeReportPayloadModelBase = ModelBase.named("MutateJokeReportPayload")
  .props({
    __typename: types.optional(types.literal("MutateJokeReportPayload"), "MutateJokeReportPayload"),
    jokeReport: types.union(
      types.undefined,
      types.null,
      types.late((): any => JokeReportModel),
    ),
    errors: types.union(
      types.undefined,
      types.null,
      types.array(types.late((): any => UserErrorModel)),
    ),
  })
  .views((self) => ({
    get store() {
      return self.__getStore<RootStoreType>()
    },
  }))

export class MutateJokeReportPayloadModelSelector extends QueryBuilder {
  jokeReport(
    builder?:
      | string
      | JokeReportModelSelector
      | ((selector: JokeReportModelSelector) => JokeReportModelSelector),
  ) {
    return this.__child(`jokeReport`, JokeReportModelSelector, builder)
  }
  errors(
    builder?:
      | string
      | UserErrorModelSelector
      | ((selector: UserErrorModelSelector) => UserErrorModelSelector),
  ) {
    return this.__child(`errors`, UserErrorModelSelector, builder)
  }
}
export function selectFromMutateJokeReportPayload() {
  return new MutateJokeReportPayloadModelSelector()
}

export const mutateJokeReportPayloadModelPrimitives = selectFromMutateJokeReportPayload()
