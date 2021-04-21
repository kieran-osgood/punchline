/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userJokeHistories: IObservableArray<UserJokeHistoryModelType>;
  categories: IObservableArray<CategoryModelType>;
  jokes: IObservableArray<JokeModelType>;
}

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.union(types.undefined, types.integer),
    firebaseUid: types.union(types.undefined, types.string),
    jokeCount: types.union(types.undefined, types.integer),
    name: types.union(types.undefined, types.string),
    createdOn: types.union(types.undefined, types.frozen()),
    lastLogin: types.union(types.undefined, types.frozen()),
    userJokeHistories: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => UserJokeHistoryModel)))),
    categories: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CategoryModel)))),
    jokes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => JokeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get firebaseUid() { return this.__attr(`firebaseUid`) }
  get jokeCount() { return this.__attr(`jokeCount`) }
  get name() { return this.__attr(`name`) }
  get createdOn() { return this.__attr(`createdOn`) }
  get lastLogin() { return this.__attr(`lastLogin`) }
  userJokeHistories(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__child(`userJokeHistories`, UserJokeHistoryModelSelector, builder) }
  categories(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__child(`categories`, CategoryModelSelector, builder) }
  jokes(builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector)) { return this.__child(`jokes`, JokeModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().firebaseUid.jokeCount.name.createdOn.lastLogin
