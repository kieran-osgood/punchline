/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * UserPayloadBase
 * auto generated base class for the model UserPayloadModel.
 */
export const UserPayloadModelBase = ModelBase
  .named('UserPayload')
  .props({
    __typename: types.optional(types.literal("UserPayload"), "UserPayload"),
    user: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    errors: types.union(types.undefined, types.null, types.array(types.late((): any => UserErrorModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserPayloadModelSelector extends QueryBuilder {
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
  errors(builder?: string | UserErrorModelSelector | ((selector: UserErrorModelSelector) => UserErrorModelSelector)) { return this.__child(`errors`, UserErrorModelSelector, builder) }
}
export function selectFromUserPayload() {
  return new UserPayloadModelSelector()
}

export const userPayloadModelPrimitives = selectFromUserPayload()
