/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { RootStoreType } from "./index"
import { JokeModel, JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { JokeReportModel } from "./JokeReportModel"
import { JokeReportModelSelector } from "./JokeReportModel.base"
import { ModelBase } from "./ModelBase"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  categories: IObservableArray<CategoryModelType>
  userJokeHistories: IObservableArray<UserJokeHistoryModelType>
  jokes: IObservableArray<JokeModelType>
}

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = withTypedRefs<Refs>()(
  ModelBase.named("User")
    .props({
      __typename: types.optional(types.literal("User"), "User"),
      id: types.identifier,
      categories: types.union(
        types.undefined,
        types.null,
        types.array(types.union(types.null, MSTGQLRef(types.late((): any => CategoryModel)))),
      ),
      firebaseUid: types.union(types.undefined, types.string),
      jokeCount: types.union(types.undefined, types.integer),
      name: types.union(types.undefined, types.string),
      createdOn: types.union(types.undefined, types.frozen()),
      lastLogin: types.union(types.undefined, types.frozen()),
      onboardingComplete: types.union(types.undefined, types.boolean),
      userJokeHistories: types.union(
        types.undefined,
        types.array(MSTGQLRef(types.late((): any => UserJokeHistoryModel))),
      ),
      jokes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => JokeModel)))),
      jokeReports: types.union(
        types.undefined,
        types.array(types.late((): any => JokeReportModel)),
      ),
    })
    .views((self) => ({
      get store() {
        return self.__getStore<RootStoreType>()
      },
    })),
)

export class UserModelSelector extends QueryBuilder {
  get id() {
    return this.__attr(`id`)
  }
  get firebaseUid() {
    return this.__attr(`firebaseUid`)
  }
  get jokeCount() {
    return this.__attr(`jokeCount`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get createdOn() {
    return this.__attr(`createdOn`)
  }
  get lastLogin() {
    return this.__attr(`lastLogin`)
  }
  get onboardingComplete() {
    return this.__attr(`onboardingComplete`)
  }
  categories(
    builder?:
      | string
      | CategoryModelSelector
      | ((selector: CategoryModelSelector) => CategoryModelSelector),
  ) {
    return this.__child(`categories`, CategoryModelSelector, builder)
  }
  userJokeHistories(
    builder?:
      | string
      | UserJokeHistoryModelSelector
      | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector),
  ) {
    return this.__child(`userJokeHistories`, UserJokeHistoryModelSelector, builder)
  }
  jokes(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__child(`jokes`, JokeModelSelector, builder)
  }
  jokeReports(
    builder?:
      | string
      | JokeReportModelSelector
      | ((selector: JokeReportModelSelector) => JokeReportModelSelector),
  ) {
    return this.__child(`jokeReports`, JokeReportModelSelector, builder)
  }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().firebaseUid.jokeCount.name.createdOn.lastLogin
  .onboardingComplete
