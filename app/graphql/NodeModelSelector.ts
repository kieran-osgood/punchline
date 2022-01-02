/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { QueryBuilder } from "mst-gql"
import { CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { JokeReportModelType } from "./JokeReportModel"
import { JokeReportModelSelector } from "./JokeReportModel.base"
import { UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"

export type NodeUnion =
  | JokeModelType
  | JokeReportModelType
  | UserModelType
  | CategoryModelType
  | UserJokeHistoryModelType

export class NodeModelSelector extends QueryBuilder {
  get id() {
    return this.__attr(`id`)
  }
  joke(
    builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector),
  ) {
    return this.__inlineFragment(`Joke`, JokeModelSelector, builder)
  }
  jokeReport(
    builder?:
      | string
      | JokeReportModelSelector
      | ((selector: JokeReportModelSelector) => JokeReportModelSelector),
  ) {
    return this.__inlineFragment(`JokeReport`, JokeReportModelSelector, builder)
  }
  user(
    builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector),
  ) {
    return this.__inlineFragment(`User`, UserModelSelector, builder)
  }
  category(
    builder?:
      | string
      | CategoryModelSelector
      | ((selector: CategoryModelSelector) => CategoryModelSelector),
  ) {
    return this.__inlineFragment(`Category`, CategoryModelSelector, builder)
  }
  userJokeHistory(
    builder?:
      | string
      | UserJokeHistoryModelSelector
      | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector),
  ) {
    return this.__inlineFragment(`UserJokeHistory`, UserJokeHistoryModelSelector, builder)
  }
}
export function selectFromNode() {
  return new NodeModelSelector()
}

export const nodeModelPrimitives = selectFromNode()
