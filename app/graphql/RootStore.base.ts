/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { JokeConnectionModel, JokeConnectionModelType } from "./JokeConnectionModel"
import { jokeConnectionModelPrimitives, JokeConnectionModelSelector } from "./JokeConnectionModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"
import { JokeEdgeModel, JokeEdgeModelType } from "./JokeEdgeModel"
import { jokeEdgeModelPrimitives, JokeEdgeModelSelector } from "./JokeEdgeModel.base"
import { JokeModel, JokeModelType } from "./JokeModel"
import { jokeModelPrimitives, JokeModelSelector } from "./JokeModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { userJokeHistoryModelPrimitives, UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { categoryModelPrimitives, CategoryModelSelector } from "./CategoryModel.base"
import { CategoryConnectionModel, CategoryConnectionModelType } from "./CategoryConnectionModel"
import { categoryConnectionModelPrimitives, CategoryConnectionModelSelector } from "./CategoryConnectionModel.base"
import { CategoryEdgeModel, CategoryEdgeModelType } from "./CategoryEdgeModel"
import { categoryEdgeModelPrimitives, CategoryEdgeModelSelector } from "./CategoryEdgeModel.base"
import { UserJokeHistoryConnectionModel, UserJokeHistoryConnectionModelType } from "./UserJokeHistoryConnectionModel"
import { userJokeHistoryConnectionModelPrimitives, UserJokeHistoryConnectionModelSelector } from "./UserJokeHistoryConnectionModel.base"
import { UserJokeHistoryEdgeModel, UserJokeHistoryEdgeModelType } from "./UserJokeHistoryEdgeModel"
import { userJokeHistoryEdgeModelPrimitives, UserJokeHistoryEdgeModelSelector } from "./UserJokeHistoryEdgeModel.base"
import { RateJokePayloadModel, RateJokePayloadModelType } from "./RateJokePayloadModel"
import { rateJokePayloadModelPrimitives, RateJokePayloadModelSelector } from "./RateJokePayloadModel.base"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { userErrorModelPrimitives, UserErrorModelSelector } from "./UserErrorModel.base"

import { nodeModelPrimitives, NodeModelSelector , NodeUnion } from "./"

import { JokeLength } from "./JokeLengthEnum"
import { RatingValue } from "./RatingValueEnum"
import { SortEnumType } from "./SortEnumTypeEnum"
import { ErrorCodes } from "./ErrorCodesEnum"
import { ApplyPolicy } from "./ApplyPolicyEnum"

export type JokeFilterInput = {
  and?: JokeFilterInput[]
  or?: JokeFilterInput[]
  id?: ComparableInt32OperationFilterInput
  title?: StringOperationFilterInput
  body?: StringOperationFilterInput
  score?: ComparableInt32OperationFilterInput
  userJokeHistories?: ListFilterInputTypeOfUserJokeHistoryFilterInput
  categories?: ListFilterInputTypeOfCategoryFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
}
export type ComparableInt32OperationFilterInput = {
  eq?: number
  neq?: number
  in?: number[]
  nin?: number[]
  gt?: number
  ngt?: number
  gte?: number
  ngte?: number
  lt?: number
  nlt?: number
  lte?: number
  nlte?: number
}
export type StringOperationFilterInput = {
  and?: StringOperationFilterInput[]
  or?: StringOperationFilterInput[]
  eq?: string
  neq?: string
  contains?: string
  ncontains?: string
  in?: string[]
  nin?: string[]
  startsWith?: string
  nstartsWith?: string
  endsWith?: string
  nendsWith?: string
}
export type ListFilterInputTypeOfUserJokeHistoryFilterInput = {
  all?: UserJokeHistoryFilterInput
  none?: UserJokeHistoryFilterInput
  some?: UserJokeHistoryFilterInput
  any?: boolean
}
export type UserJokeHistoryFilterInput = {
  and?: UserJokeHistoryFilterInput[]
  or?: UserJokeHistoryFilterInput[]
  bookmarked?: BooleanOperationFilterInput
  rating?: RatingValueOperationFilterInput
  userId?: ComparableInt32OperationFilterInput
  user?: UserFilterInput
  jokeId?: ComparableInt32OperationFilterInput
  joke?: JokeFilterInput
}
export type BooleanOperationFilterInput = {
  eq?: boolean
  neq?: boolean
}
export type RatingValueOperationFilterInput = {
  eq?: RatingValue
  neq?: RatingValue
  in?: RatingValue[]
  nin?: RatingValue[]
}
export type UserFilterInput = {
  and?: UserFilterInput[]
  or?: UserFilterInput[]
  id?: ComparableInt32OperationFilterInput
  firebaseUid?: StringOperationFilterInput
  jokeCount?: ComparableInt32OperationFilterInput
  name?: StringOperationFilterInput
  createdOn?: ComparableDateTimeOperationFilterInput
  lastLogin?: ComparableDateTimeOperationFilterInput
  userJokeHistories?: ListFilterInputTypeOfUserJokeHistoryFilterInput
  categories?: ListFilterInputTypeOfCategoryFilterInput
  jokes?: ListFilterInputTypeOfJokeFilterInput
}
export type ComparableDateTimeOperationFilterInput = {
  eq?: any
  neq?: any
  in?: any[]
  nin?: any[]
  gt?: any
  ngt?: any
  gte?: any
  ngte?: any
  lt?: any
  nlt?: any
  lte?: any
  nlte?: any
}
export type ListFilterInputTypeOfCategoryFilterInput = {
  all?: CategoryFilterInput
  none?: CategoryFilterInput
  some?: CategoryFilterInput
  any?: boolean
}
export type CategoryFilterInput = {
  and?: CategoryFilterInput[]
  or?: CategoryFilterInput[]
  id?: ComparableInt32OperationFilterInput
  name?: StringOperationFilterInput
  jokes?: ListFilterInputTypeOfJokeFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
}
export type ListFilterInputTypeOfJokeFilterInput = {
  all?: JokeFilterInput
  none?: JokeFilterInput
  some?: JokeFilterInput
  any?: boolean
}
export type ListFilterInputTypeOfUserFilterInput = {
  all?: UserFilterInput
  none?: UserFilterInput
  some?: UserFilterInput
  any?: boolean
}
export type JokeSortInput = {
  id?: SortEnumType
  title?: SortEnumType
  body?: SortEnumType
  score?: SortEnumType
}
export type CategorySortInput = {
  id?: SortEnumType
  name?: SortEnumType
}
export type UserJokeHistorySortInput = {
  bookmarked?: SortEnumType
  rating?: SortEnumType
  userId?: SortEnumType
  user?: UserSortInput
  jokeId?: SortEnumType
  joke?: JokeSortInput
}
export type UserSortInput = {
  id?: SortEnumType
  firebaseUid?: SortEnumType
  jokeCount?: SortEnumType
  name?: SortEnumType
  createdOn?: SortEnumType
  lastLogin?: SortEnumType
}
export type RateJokeInput = {
  jokeId: string
  rating: RatingValue
  bookmarked: boolean
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  jokes: ObservableMap<string, JokeModelType>,
  userJokeHistories: ObservableMap<string, UserJokeHistoryModelType>,
  categories: ObservableMap<string, CategoryModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryNode="queryNode",
queryJokes="queryJokes",
queryCategories="queryCategories",
queryUserJokeHistories="queryUserJokeHistories",
queryUserJokeHistoryByUserId="queryUserJokeHistoryByUserId"
}
export enum RootStoreBaseMutations {
mutateRateJoke="mutateRateJoke"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['JokeConnection', () => JokeConnectionModel], ['PageInfo', () => PageInfoModel], ['JokeEdge', () => JokeEdgeModel], ['Joke', () => JokeModel], ['UserJokeHistory', () => UserJokeHistoryModel], ['User', () => UserModel], ['Category', () => CategoryModel], ['CategoryConnection', () => CategoryConnectionModel], ['CategoryEdge', () => CategoryEdgeModel], ['UserJokeHistoryConnection', () => UserJokeHistoryConnectionModel], ['UserJokeHistoryEdge', () => UserJokeHistoryEdgeModel], ['RateJokePayload', () => RateJokePayloadModel], ['UserError', () => UserErrorModel]], ['Joke', 'UserJokeHistory', 'Category'], "js"))
  .props({
    jokes: types.optional(types.map(types.late((): any => JokeModel)), {}),
    userJokeHistories: types.optional(types.map(types.late((): any => UserJokeHistoryModel)), {}),
    categories: types.optional(types.map(types.late((): any => CategoryModel)), {})
  })
  .actions(self => ({
    queryNode(variables: { id: string }, resultSelector: string | ((qb: NodeModelSelector) => NodeModelSelector) = nodeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ node: NodeUnion}>(`query node($id: ID!) { node(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new NodeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryJokes(variables: { first?: number, after?: string, last?: number, before?: string, jokeLength: JokeLength, where?: JokeFilterInput, order?: JokeSortInput[] }, resultSelector: string | ((qb: JokeConnectionModelSelector) => JokeConnectionModelSelector) = jokeConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ jokes: JokeConnectionModelType}>(`query jokes($first: Int, $after: String, $last: Int, $before: String, $jokeLength: JokeLength!, $where: JokeFilterInput, $order: [JokeSortInput!]) { jokes(first: $first, after: $after, last: $last, before: $before, jokeLength: $jokeLength, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new JokeConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCategories(variables: { first?: number, after?: string, last?: number, before?: string, where?: CategoryFilterInput, order?: CategorySortInput[] }, resultSelector: string | ((qb: CategoryConnectionModelSelector) => CategoryConnectionModelSelector) = categoryConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ categories: CategoryConnectionModelType}>(`query categories($first: Int, $after: String, $last: Int, $before: String, $where: CategoryFilterInput, $order: [CategorySortInput!]) { categories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new CategoryConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUserJokeHistories(variables: { first?: number, after?: string, last?: number, before?: string, where?: UserJokeHistoryFilterInput, order?: UserJokeHistorySortInput[] }, resultSelector: string | ((qb: UserJokeHistoryConnectionModelSelector) => UserJokeHistoryConnectionModelSelector) = userJokeHistoryConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userJokeHistories: UserJokeHistoryConnectionModelType}>(`query userJokeHistories($first: Int, $after: String, $last: Int, $before: String, $where: UserJokeHistoryFilterInput, $order: [UserJokeHistorySortInput!]) { userJokeHistories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new UserJokeHistoryConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUserJokeHistoryByUserId(variables: { first?: number, after?: string, last?: number, before?: string, where?: UserJokeHistoryFilterInput, order?: UserJokeHistorySortInput[] }, resultSelector: string | ((qb: UserJokeHistoryConnectionModelSelector) => UserJokeHistoryConnectionModelSelector) = userJokeHistoryConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userJokeHistoryByUserId: UserJokeHistoryConnectionModelType}>(`query userJokeHistoryByUserId($first: Int, $after: String, $last: Int, $before: String, $where: UserJokeHistoryFilterInput, $order: [UserJokeHistorySortInput!]) { userJokeHistoryByUserId(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new UserJokeHistoryConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateRateJoke(variables: { input: RateJokeInput }, resultSelector: string | ((qb: RateJokePayloadModelSelector) => RateJokePayloadModelSelector) = rateJokePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ rateJoke: RateJokePayloadModelType}>(`mutation rateJoke($input: RateJokeInput!) { rateJoke(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new RateJokePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
