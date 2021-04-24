/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userJokeHistories: IObservableArray<UserJokeHistoryModelType>;
  categories: IObservableArray<CategoryModelType>;
  users: IObservableArray<UserModelType>;
}

/**
 * JokeBase
 * auto generated base class for the model JokeModel.
 */
export const JokeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Joke')
  .props({
    __typename: types.optional(types.literal("Joke"), "Joke"),
    id: types.identifier,
    title: types.union(types.undefined, types.string),
    body: types.union(types.undefined, types.string),
    score: types.union(types.undefined, types.integer),
    userJokeHistories: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => UserJokeHistoryModel)))),
    categories: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CategoryModel)))),
    users: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => UserModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class JokeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get title() { return this.__attr(`title`) }
  get body() { return this.__attr(`body`) }
  get score() { return this.__attr(`score`) }
  userJokeHistories(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__child(`userJokeHistories`, UserJokeHistoryModelSelector, builder) }
  categories(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__child(`categories`, CategoryModelSelector, builder) }
  users(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`users`, UserModelSelector, builder) }
}
export function selectFromJoke() {
  return new JokeModelSelector()
}

export const jokeModelPrimitives = selectFromJoke().title.body.score
