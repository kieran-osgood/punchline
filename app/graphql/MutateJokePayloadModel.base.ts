/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ApiRootStoreType } from "./index"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { ModelBase } from "./ModelBase"
import { UserErrorModel } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  joke: JokeModelType
}

/**
 * MutateJokePayloadBase
 * auto generated base class for the model MutateJokePayloadModel.
 */
export const MutateJokePayloadModelBase = withTypedRefs<Refs>()(
  ModelBase.named("MutateJokePayload")
    .props({
      __typename: types.optional(types.literal("MutateJokePayload"), "MutateJokePayload"),
      joke: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => JokeModel))),
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

export class MutateJokePayloadModelSelector extends QueryBuilder {
  joke(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`joke`, JokeModelSelector, builder)
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
export function selectFromMutateJokePayload() {
  return new MutateJokePayloadModelSelector()
}

export const mutateJokePayloadModelPrimitives = selectFromMutateJokePayload()
