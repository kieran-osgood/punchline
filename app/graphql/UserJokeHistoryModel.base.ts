/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { RatingValueEnumType } from "./RatingValueEnum"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  joke: JokeModelType
  user: UserModelType
}

/**
 * UserJokeHistoryBase
 * auto generated base class for the model UserJokeHistoryModel.
 */
export const UserJokeHistoryModelBase = withTypedRefs<Refs>()(
  ModelBase.named("UserJokeHistory")
    .props({
      __typename: types.optional(types.literal("UserJokeHistory"), "UserJokeHistory"),
      id: types.identifier,
      bookmarked: types.union(types.undefined, types.boolean),
      rating: types.union(types.undefined, RatingValueEnumType),
      createdAt: types.union(types.undefined, types.frozen()),
      joke: types.union(types.undefined, MSTGQLRef(types.late((): any => JokeModel))),
      user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class UserJokeHistoryModelSelector extends QueryBuilder {
  get id() {
    return this.__attr(`id`)
  }
  get bookmarked() {
    return this.__attr(`bookmarked`)
  }
  get rating() {
    return this.__attr(`rating`)
  }
  get createdAt() {
    return this.__attr(`createdAt`)
  }
  joke(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`joke`, JokeModelSelector, builder)
  }
  user(
    builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector),
  ) {
    return this.__child(`user`, UserModelSelector, builder)
  }
}
export function selectFromUserJokeHistory() {
  return new UserJokeHistoryModelSelector()
}

export const userJokeHistoryModelPrimitives =
  selectFromUserJokeHistory().bookmarked.rating.createdAt
