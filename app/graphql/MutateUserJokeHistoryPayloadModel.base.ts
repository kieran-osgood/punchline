/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ApiRootStoreType } from "./index"
import { ModelBase } from "./ModelBase"
import { UserErrorModel } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userJokeHistory: UserJokeHistoryModelType
}

/**
 * MutateUserJokeHistoryPayloadBase
 * auto generated base class for the model MutateUserJokeHistoryPayloadModel.
 */
export const MutateUserJokeHistoryPayloadModelBase = withTypedRefs<Refs>()(
  ModelBase.named("MutateUserJokeHistoryPayload")
    .props({
      __typename: types.optional(
        types.literal("MutateUserJokeHistoryPayload"),
        "MutateUserJokeHistoryPayload",
      ),
      userJokeHistory: types.union(
        types.undefined,
        types.null,
        MSTGQLRef(types.late((): any => UserJokeHistoryModel)),
      ),
      errors: types.union(
        types.undefined,
        types.null,
        types.array(types.late((): any => UserErrorModel)),
      ),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<ApiRootStoreType>()
      },
    })),
)

export class MutateUserJokeHistoryPayloadModelSelector extends QueryBuilder {
  userJokeHistory(
    builder?:
      | string
      | UserJokeHistoryModelSelector
      | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector),
  ) {
    return this.__child(`userJokeHistory`, UserJokeHistoryModelSelector, builder)
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
export function selectFromMutateUserJokeHistoryPayload() {
  return new MutateUserJokeHistoryPayloadModelSelector()
}

export const mutateUserJokeHistoryPayloadModelPrimitives = selectFromMutateUserJokeHistoryPayload()
