/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  reportingUser: UserModelType;
}

/**
 * BugReportBase
 * auto generated base class for the model BugReportModel.
 */
export const BugReportModelBase = withTypedRefs<Refs>()(ModelBase
  .named('BugReport')
  .props({
    __typename: types.optional(types.literal("BugReport"), "BugReport"),
    id: types.union(types.undefined, types.integer),
    description: types.union(types.undefined, types.string),
    reportingUser: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class BugReportModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get description() { return this.__attr(`description`) }
  reportingUser(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`reportingUser`, UserModelSelector, builder) }
}
export function selectFromBugReport() {
  return new BugReportModelSelector()
}

export const bugReportModelPrimitives = selectFromBugReport().description
