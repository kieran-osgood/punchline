/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userJokeHistory: UserJokeHistoryModelType;
}

/**
 * RateJokePayloadBase
 * auto generated base class for the model RateJokePayloadModel.
 */
export const RateJokePayloadModelBase = withTypedRefs<Refs>()(ModelBase
  .named('RateJokePayload')
  .props({
    __typename: types.optional(types.literal("RateJokePayload"), "RateJokePayload"),
    userJokeHistory: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserJokeHistoryModel))),
    errors: types.union(types.undefined, types.null, types.array(types.late((): any => UserErrorModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class RateJokePayloadModelSelector extends QueryBuilder {
  userJokeHistory(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__child(`userJokeHistory`, UserJokeHistoryModelSelector, builder) }
  errors(builder?: string | UserErrorModelSelector | ((selector: UserErrorModelSelector) => UserErrorModelSelector)) { return this.__child(`errors`, UserErrorModelSelector, builder) }
}
export function selectFromRateJokePayload() {
  return new RateJokePayloadModelSelector()
}

export const rateJokePayloadModelPrimitives = selectFromRateJokePayload()
