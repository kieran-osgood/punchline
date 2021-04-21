/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { QueryBuilder } from "mst-gql"
import { CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { JokeModelType } from "./JokeModel"
import { JokeModelSelector } from "./JokeModel.base"

export type NodeUnion = JokeModelType | CategoryModelType

export class NodeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  joke(builder?: string | JokeModelSelector | ((selector: JokeModelSelector) => JokeModelSelector)) { return this.__inlineFragment(`Joke`, JokeModelSelector, builder) }
  category(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__inlineFragment(`Category`, CategoryModelSelector, builder) }
}
export function selectFromNode() {
  return new NodeModelSelector()
}

export const nodeModelPrimitives = selectFromNode()