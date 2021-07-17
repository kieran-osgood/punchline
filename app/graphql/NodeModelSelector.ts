/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { QueryBuilder } from "mst-gql"
import { CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"
import { UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"

export type NodeUnion = JokeModelType | CategoryModelType | UserJokeHistoryModelType

export class NodeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  joke(builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector)) { return this.__inlineFragment(`Joke`, JokeModelSelector, builder) }
  category(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__inlineFragment(`Category`, CategoryModelSelector, builder) }
  userJokeHistory(builder?: string | UserJokeHistoryModelSelector | ((selector: UserJokeHistoryModelSelector) => UserJokeHistoryModelSelector)) { return this.__inlineFragment(`UserJokeHistory`, UserJokeHistoryModelSelector, builder) }
}
export function selectFromNode() {
  return new NodeModelSelector()
}

export const nodeModelPrimitives = selectFromNode()