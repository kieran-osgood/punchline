/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ErrorCodesEnumType } from "./ErrorCodesEnum"
import { ApiStoreType } from "./index"
import { ModelBase } from "./ModelBase"

/**
 * UserErrorBase
 * auto generated base class for the model UserErrorModel.
 */
export const UserErrorModelBase = ModelBase.named("UserError")
  .props({
    __typename: types.optional(types.literal("UserError"), "UserError"),
    code: types.union(types.undefined, ErrorCodesEnumType),
    message: types.union(types.undefined, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore<ApiStoreType>()
    },
  }))

export class UserErrorModelSelector extends QueryBuilder {
  get code() {
    return this.__attr(`code`)
  }
  get message() {
    return this.__attr(`message`)
  }
}
export function selectFromUserError() {
  return new UserErrorModelSelector()
}

export const userErrorModelPrimitives = selectFromUserError().code.message
