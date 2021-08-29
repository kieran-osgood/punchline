/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { JokeModel, JokeModelType } from "./JokeModel"
import { jokeModelPrimitives, JokeModelSelector } from "./JokeModel.base"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { categoryModelPrimitives, CategoryModelSelector } from "./CategoryModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { userJokeHistoryModelPrimitives, UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { JokeConnectionModel, JokeConnectionModelType } from "./JokeConnectionModel"
import { jokeConnectionModelPrimitives, JokeConnectionModelSelector } from "./JokeConnectionModel.base"
import { CategoryConnectionModel, CategoryConnectionModelType } from "./CategoryConnectionModel"
import { categoryConnectionModelPrimitives, CategoryConnectionModelSelector } from "./CategoryConnectionModel.base"
import { UserJokeHistoryConnectionModel, UserJokeHistoryConnectionModelType } from "./UserJokeHistoryConnectionModel"
import { userJokeHistoryConnectionModelPrimitives, UserJokeHistoryConnectionModelSelector } from "./UserJokeHistoryConnectionModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"
import { JokeEdgeModel, JokeEdgeModelType } from "./JokeEdgeModel"
import { jokeEdgeModelPrimitives, JokeEdgeModelSelector } from "./JokeEdgeModel.base"
import { CategoryEdgeModel, CategoryEdgeModelType } from "./CategoryEdgeModel"
import { categoryEdgeModelPrimitives, CategoryEdgeModelSelector } from "./CategoryEdgeModel.base"
import { UserJokeHistoryEdgeModel, UserJokeHistoryEdgeModelType } from "./UserJokeHistoryEdgeModel"
import { userJokeHistoryEdgeModelPrimitives, UserJokeHistoryEdgeModelSelector } from "./UserJokeHistoryEdgeModel.base"
import { UserPayloadModel, UserPayloadModelType } from "./UserPayloadModel"
import { userPayloadModelPrimitives, UserPayloadModelSelector } from "./UserPayloadModel.base"
import { MutateUserJokeHistoryPayloadModel, MutateUserJokeHistoryPayloadModelType } from "./MutateUserJokeHistoryPayloadModel"
import { mutateUserJokeHistoryPayloadModelPrimitives, MutateUserJokeHistoryPayloadModelSelector } from "./MutateUserJokeHistoryPayloadModel.base"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { userErrorModelPrimitives, UserErrorModelSelector } from "./UserErrorModel.base"

import { nodeModelPrimitives, NodeModelSelector , NodeUnion } from "./"

import { ApplyPolicy } from "./ApplyPolicyEnum"
import { JokeLength } from "./JokeLengthEnum"
import { RatingValue } from "./RatingValueEnum"
import { SortEnumType } from "./SortEnumTypeEnum"
import { ErrorCodes } from "./ErrorCodesEnum"

export type JokeFilterInput = {
  and?: JokeFilterInput[]
  or?: JokeFilterInput[]
  id?: ComparableInt32OperationFilterInput
  title?: StringOperationFilterInput
  body?: StringOperationFilterInput
  positiveRating?: ComparableInt32OperationFilterInput
  negativeRating?: ComparableInt32OperationFilterInput
  skipRating?: ComparableInt32OperationFilterInput
  reportCount?: ComparableInt32OperationFilterInput
  userJokeHistories?: ListFilterInputTypeOfUserJokeHistoryFilterInput
  categories?: ListFilterInputTypeOfCategoryFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
  length?: JokeLengthOperationFilterInput
}
export type JokeSortInput = {
  id?: SortEnumType
  title?: SortEnumType
  body?: SortEnumType
  positiveRating?: SortEnumType
  negativeRating?: SortEnumType
  skipRating?: SortEnumType
  reportCount?: SortEnumType
  length?: SortEnumType
}
export type CategoryFilterInput = {
  and?: CategoryFilterInput[]
  or?: CategoryFilterInput[]
  id?: ComparableInt32OperationFilterInput
  name?: StringOperationFilterInput
  image?: StringOperationFilterInput
  jokes?: ListFilterInputTypeOfJokeFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
}
export type CategorySortInput = {
  id?: SortEnumType
  name?: SortEnumType
  image?: SortEnumType
}
export type UserJokeHistoryFilterInput = {
  and?: UserJokeHistoryFilterInput[]
  or?: UserJokeHistoryFilterInput[]
  id?: ComparableInt32OperationFilterInput
  bookmarked?: BooleanOperationFilterInput
  rating?: RatingValueOperationFilterInput
  user?: UserFilterInput
  joke?: JokeFilterInput
}
export type UserJokeHistorySortInput = {
  id?: SortEnumType
  bookmarked?: SortEnumType
  rating?: SortEnumType
  user?: UserSortInput
  joke?: JokeSortInput
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
export type ListFilterInputTypeOfCategoryFilterInput = {
  all?: CategoryFilterInput
  none?: CategoryFilterInput
  some?: CategoryFilterInput
  any?: boolean
}
export type ListFilterInputTypeOfUserFilterInput = {
  all?: UserFilterInput
  none?: UserFilterInput
  some?: UserFilterInput
  any?: boolean
}
export type JokeLengthOperationFilterInput = {
  eq?: JokeLength
  neq?: JokeLength
  in?: JokeLength[]
  nin?: JokeLength[]
}
export type ListFilterInputTypeOfJokeFilterInput = {
  all?: JokeFilterInput
  none?: JokeFilterInput
  some?: JokeFilterInput
  any?: boolean
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
  onboardingComplete?: BooleanOperationFilterInput
  userJokeHistories?: ListFilterInputTypeOfUserJokeHistoryFilterInput
  categories?: ListFilterInputTypeOfCategoryFilterInput
  jokes?: ListFilterInputTypeOfJokeFilterInput
}
export type UserSortInput = {
  id?: SortEnumType
  firebaseUid?: SortEnumType
  jokeCount?: SortEnumType
  name?: SortEnumType
  createdOn?: SortEnumType
  lastLogin?: SortEnumType
  onboardingComplete?: SortEnumType
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
export type UserLoginInput = {
  firebaseUid: string
  username: string
}
export type UpdateBookmarkInput = {
  id: string
  rating?: RatingValue
  bookmarked?: boolean
}
export type RateJokeInput = {
  jokeId: string
  rating: RatingValue
  bookmarked: boolean
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  jokes: ObservableMap<string, JokeModelType>,
  users: ObservableMap<string, UserModelType>,
  categories: ObservableMap<string, CategoryModelType>,
  userJokeHistories: ObservableMap<string, UserJokeHistoryModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryNode="queryNode",
queryJokes="queryJokes",
queryCategories="queryCategories",
queryUserCategories="queryUserCategories",
queryUserJokeHistories="queryUserJokeHistories",
queryUserJokeHistoryByUserId="queryUserJokeHistoryByUserId"
}
export enum RootStoreBaseMutations {
mutateRateJoke="mutateRateJoke",
mutateDeleteUserJokeHistory="mutateDeleteUserJokeHistory",
mutateUpdateUserJokeHistory="mutateUpdateUserJokeHistory",
mutateLogin="mutateLogin",
mutateCompleteOnboarding="mutateCompleteOnboarding"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Joke', () => JokeModel], ['Category', () => CategoryModel], ['UserJokeHistory', () => UserJokeHistoryModel], ['User', () => UserModel], ['JokeConnection', () => JokeConnectionModel], ['CategoryConnection', () => CategoryConnectionModel], ['UserJokeHistoryConnection', () => UserJokeHistoryConnectionModel], ['PageInfo', () => PageInfoModel], ['JokeEdge', () => JokeEdgeModel], ['CategoryEdge', () => CategoryEdgeModel], ['UserJokeHistoryEdge', () => UserJokeHistoryEdgeModel], ['UserPayload', () => UserPayloadModel], ['MutateUserJokeHistoryPayload', () => MutateUserJokeHistoryPayloadModel], ['UserError', () => UserErrorModel]], ['Joke', 'User', 'Category', 'UserJokeHistory'], "js"))
  .props({
    jokes: types.optional(types.map(types.late((): any => JokeModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    categories: types.optional(types.map(types.late((): any => CategoryModel)), {}),
    userJokeHistories: types.optional(types.map(types.late((): any => UserJokeHistoryModel)), {})
  })
  .actions(self => ({
    queryNode(variables: { id: string }, resultSelector: string | ((qb: NodeModelSelector) => NodeModelSelector) = nodeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ node: NodeUnion}>(`query node($id: ID!) { node(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new NodeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryJokes(variables: { first?: number, after?: string, last?: number, before?: string, deepLinkedJokeId?: string, jokeLength: JokeLength, blockedCategoryIds: string[], where?: JokeFilterInput, order?: JokeSortInput[] }, resultSelector: string | ((qb: JokeConnectionModelSelector) => JokeConnectionModelSelector) = jokeConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ jokes: JokeConnectionModelType}>(`query jokes($first: Int, $after: String, $last: Int, $before: String, $deepLinkedJokeId: ID, $jokeLength: JokeLength!, $blockedCategoryIds: [ID!]!, $where: JokeFilterInput, $order: [JokeSortInput!]) { jokes(first: $first, after: $after, last: $last, before: $before, deepLinkedJokeId: $deepLinkedJokeId, jokeLength: $jokeLength, blockedCategoryIds: $blockedCategoryIds, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new JokeConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCategories(variables: { first?: number, after?: string, last?: number, before?: string, where?: CategoryFilterInput, order?: CategorySortInput[] }, resultSelector: string | ((qb: CategoryConnectionModelSelector) => CategoryConnectionModelSelector) = categoryConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ categories: CategoryConnectionModelType}>(`query categories($first: Int, $after: String, $last: Int, $before: String, $where: CategoryFilterInput, $order: [CategorySortInput!]) { categories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new CategoryConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUserCategories(variables: { first?: number, after?: string, last?: number, before?: string, uid: string, where?: CategoryFilterInput, order?: CategorySortInput[] }, resultSelector: string | ((qb: CategoryConnectionModelSelector) => CategoryConnectionModelSelector) = categoryConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userCategories: CategoryConnectionModelType}>(`query userCategories($first: Int, $after: String, $last: Int, $before: String, $uid: String!, $where: CategoryFilterInput, $order: [CategorySortInput!]) { userCategories(first: $first, after: $after, last: $last, before: $before, uid: $uid, where: $where, order: $order) {
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
    mutateRateJoke(variables: { input: RateJokeInput }, resultSelector: string | ((qb: MutateUserJokeHistoryPayloadModelSelector) => MutateUserJokeHistoryPayloadModelSelector) = mutateUserJokeHistoryPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ rateJoke: MutateUserJokeHistoryPayloadModelType}>(`mutation rateJoke($input: RateJokeInput!) { rateJoke(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new MutateUserJokeHistoryPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteUserJokeHistory(variables: { id: string }, resultSelector: string | ((qb: MutateUserJokeHistoryPayloadModelSelector) => MutateUserJokeHistoryPayloadModelSelector) = mutateUserJokeHistoryPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteUserJokeHistory: MutateUserJokeHistoryPayloadModelType}>(`mutation deleteUserJokeHistory($id: ID!) { deleteUserJokeHistory(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new MutateUserJokeHistoryPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateUserJokeHistory(variables: { input: UpdateBookmarkInput }, resultSelector: string | ((qb: MutateUserJokeHistoryPayloadModelSelector) => MutateUserJokeHistoryPayloadModelSelector) = mutateUserJokeHistoryPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUserJokeHistory: MutateUserJokeHistoryPayloadModelType}>(`mutation updateUserJokeHistory($input: UpdateBookmarkInput!) { updateUserJokeHistory(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new MutateUserJokeHistoryPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { input: UserLoginInput }, resultSelector: string | ((qb: UserPayloadModelSelector) => UserPayloadModelSelector) = userPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: UserPayloadModelType}>(`mutation login($input: UserLoginInput!) { login(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCompleteOnboarding(variables: { input: UserLoginInput }, resultSelector: string | ((qb: UserPayloadModelSelector) => UserPayloadModelSelector) = userPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ completeOnboarding: UserPayloadModelType}>(`mutation completeOnboarding($input: UserLoginInput!) { completeOnboarding(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
