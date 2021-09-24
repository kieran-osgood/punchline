/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ApiRootStoreType } from "./index"
import { ModelBase } from "./ModelBase"
import { UserErrorModel } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType
}

/**
 * UserPayloadBase
 * auto generated base class for the model UserPayloadModel.
 */
export const UserPayloadModelBase = withTypedRefs<Refs>()(
  ModelBase.named("UserPayload")
    .props({
      __typename: types.optional(types.literal("UserPayload"), "UserPayload"),
      user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserModel))),
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

export class UserPayloadModelSelector extends QueryBuilder {
  user(
    builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector),
  ) {
    return this.__child(`user`, UserModelSelector, builder)
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
export function selectFromUserPayload() {
  return new UserPayloadModelSelector()
}

export const userPayloadModelPrimitives = selectFromUserPayload()
