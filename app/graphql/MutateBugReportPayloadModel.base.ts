/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { BugReportModel, BugReportModelType } from "./BugReportModel"
import { BugReportModelSelector } from "./BugReportModel.base"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { UserErrorModelSelector } from "./UserErrorModel.base"
import { RootStoreType } from "./index"


/**
 * MutateBugReportPayloadBase
 * auto generated base class for the model MutateBugReportPayloadModel.
 */
export const MutateBugReportPayloadModelBase = ModelBase
  .named('MutateBugReportPayload')
  .props({
    __typename: types.optional(types.literal("MutateBugReportPayload"), "MutateBugReportPayload"),
    bugReport: types.union(types.undefined, types.null, types.late((): any => BugReportModel)),
    errors: types.union(types.undefined, types.null, types.array(types.late((): any => UserErrorModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MutateBugReportPayloadModelSelector extends QueryBuilder {
  bugReport(builder?: string | BugReportModelSelector | ((selector: BugReportModelSelector) => BugReportModelSelector)) { return this.__child(`bugReport`, BugReportModelSelector, builder) }
  errors(builder?: string | UserErrorModelSelector | ((selector: UserErrorModelSelector) => UserErrorModelSelector)) { return this.__child(`errors`, UserErrorModelSelector, builder) }
}
export function selectFromMutateBugReportPayload() {
  return new MutateBugReportPayloadModelSelector()
}

export const mutateBugReportPayloadModelPrimitives = selectFromMutateBugReportPayload()
