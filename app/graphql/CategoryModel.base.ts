/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  jokes: IObservableArray<JokeModelType>;
  users: IObservableArray<UserModelType>;
}

/**
 * CategoryBase
 * auto generated base class for the model CategoryModel.
 */
export const CategoryModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Category')
  .props({
    __typename: types.optional(types.literal("Category"), "Category"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    jokes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => JokeModel)))),
    users: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => UserModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CategoryModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  jokes(builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector)) { return this.__child(`jokes`, JokeModelSelector, builder) }
  users(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`users`, UserModelSelector, builder) }
}
export function selectFromCategory() {
  return new CategoryModelSelector()
}

export const categoryModelPrimitives = selectFromCategory().name
