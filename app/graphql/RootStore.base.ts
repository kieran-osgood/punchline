/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { JokeModel, JokeModelType } from "./JokeModel"
import { jokeModelPrimitives, JokeModelSelector } from "./JokeModel.base"
import { JokeReportModel, JokeReportModelType } from "./JokeReportModel"
import { jokeReportModelPrimitives, JokeReportModelSelector } from "./JokeReportModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { categoryModelPrimitives, CategoryModelSelector } from "./CategoryModel.base"
import { UserJokeHistoryModel, UserJokeHistoryModelType } from "./UserJokeHistoryModel"
import { userJokeHistoryModelPrimitives, UserJokeHistoryModelSelector } from "./UserJokeHistoryModel.base"
import { JokesConnectionModel, JokesConnectionModelType } from "./JokesConnectionModel"
import { jokesConnectionModelPrimitives, JokesConnectionModelSelector } from "./JokesConnectionModel.base"
import { CategoriesConnectionModel, CategoriesConnectionModelType } from "./CategoriesConnectionModel"
import { categoriesConnectionModelPrimitives, CategoriesConnectionModelSelector } from "./CategoriesConnectionModel.base"
import { UserCategoriesConnectionModel, UserCategoriesConnectionModelType } from "./UserCategoriesConnectionModel"
import { userCategoriesConnectionModelPrimitives, UserCategoriesConnectionModelSelector } from "./UserCategoriesConnectionModel.base"
import { UserJokeHistoryByUserIdConnectionModel, UserJokeHistoryByUserIdConnectionModelType } from "./UserJokeHistoryByUserIdConnectionModel"
import { userJokeHistoryByUserIdConnectionModelPrimitives, UserJokeHistoryByUserIdConnectionModelSelector } from "./UserJokeHistoryByUserIdConnectionModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"
import { JokesEdgeModel, JokesEdgeModelType } from "./JokesEdgeModel"
import { jokesEdgeModelPrimitives, JokesEdgeModelSelector } from "./JokesEdgeModel.base"
import { CategoriesEdgeModel, CategoriesEdgeModelType } from "./CategoriesEdgeModel"
import { categoriesEdgeModelPrimitives, CategoriesEdgeModelSelector } from "./CategoriesEdgeModel.base"
import { UserCategoriesEdgeModel, UserCategoriesEdgeModelType } from "./UserCategoriesEdgeModel"
import { userCategoriesEdgeModelPrimitives, UserCategoriesEdgeModelSelector } from "./UserCategoriesEdgeModel.base"
import { UserJokeHistoryByUserIdEdgeModel, UserJokeHistoryByUserIdEdgeModelType } from "./UserJokeHistoryByUserIdEdgeModel"
import { userJokeHistoryByUserIdEdgeModelPrimitives, UserJokeHistoryByUserIdEdgeModelSelector } from "./UserJokeHistoryByUserIdEdgeModel.base"
import { UserPayloadModel, UserPayloadModelType } from "./UserPayloadModel"
import { userPayloadModelPrimitives, UserPayloadModelSelector } from "./UserPayloadModel.base"
import { MutateJokeReportPayloadModel, MutateJokeReportPayloadModelType } from "./MutateJokeReportPayloadModel"
import { mutateJokeReportPayloadModelPrimitives, MutateJokeReportPayloadModelSelector } from "./MutateJokeReportPayloadModel.base"
import { MutateUserJokeHistoryPayloadModel, MutateUserJokeHistoryPayloadModelType } from "./MutateUserJokeHistoryPayloadModel"
import { mutateUserJokeHistoryPayloadModelPrimitives, MutateUserJokeHistoryPayloadModelSelector } from "./MutateUserJokeHistoryPayloadModel.base"
import { UserErrorModel, UserErrorModelType } from "./UserErrorModel"
import { userErrorModelPrimitives, UserErrorModelSelector } from "./UserErrorModel.base"

import { nodeModelPrimitives, NodeModelSelector , NodeUnion } from "./"

import { ApplyPolicy } from "./ApplyPolicyEnum"
import { RatingValue } from "./RatingValueEnum"
import { SortEnumType } from "./SortEnumTypeEnum"
import { JokeLength } from "./JokeLengthEnum"
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
  explicitContent?: BooleanOperationFilterInput
  userJokeHistories?: ListFilterInputTypeOfUserJokeHistoryFilterInput
  categories?: ListFilterInputTypeOfCategoryFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
  jokeReports?: ListFilterInputTypeOfJokeReportFilterInput
}
export type JokeSortInput = {
  id?: SortEnumType
  title?: SortEnumType
  body?: SortEnumType
  positiveRating?: SortEnumType
  negativeRating?: SortEnumType
  skipRating?: SortEnumType
  reportCount?: SortEnumType
  explicitContent?: SortEnumType
}
export type CategoryFilterInput = {
  and?: CategoryFilterInput[]
  or?: CategoryFilterInput[]
  id?: ComparableInt32OperationFilterInput
  name?: StringOperationFilterInput
  image?: StringOperationFilterInput
  jokes?: ListFilterInputTypeOfJokeFilterInput
  users?: ListFilterInputTypeOfUserFilterInput
  joke?: JokeFilterInput
}
export type CategorySortInput = {
  id?: SortEnumType
  name?: SortEnumType
  image?: SortEnumType
  joke?: JokeSortInput
}
export type UserJokeHistoryFilterInput = {
  and?: UserJokeHistoryFilterInput[]
  or?: UserJokeHistoryFilterInput[]
  id?: ComparableInt32OperationFilterInput
  bookmarked?: BooleanOperationFilterInput
  rating?: RatingValueOperationFilterInput
  createdAt?: ComparableDateTimeOperationFilterInput
  user?: UserFilterInput
  joke?: JokeFilterInput
}
export type UserJokeHistorySortInput = {
  id?: SortEnumType
  bookmarked?: SortEnumType
  rating?: SortEnumType
  createdAt?: SortEnumType
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
export type BooleanOperationFilterInput = {
  eq?: boolean
  neq?: boolean
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
export type ListFilterInputTypeOfJokeReportFilterInput = {
  all?: JokeReportFilterInput
  none?: JokeReportFilterInput
  some?: JokeReportFilterInput
  any?: boolean
}
export type ListFilterInputTypeOfJokeFilterInput = {
  all?: JokeFilterInput
  none?: JokeFilterInput
  some?: JokeFilterInput
  any?: boolean
}
export type RatingValueOperationFilterInput = {
  eq?: RatingValue
  neq?: RatingValue
  in?: RatingValue[]
  nin?: RatingValue[]
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
  jokeReports?: ListFilterInputTypeOfJokeReportFilterInput
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
export type JokeReportFilterInput = {
  and?: JokeReportFilterInput[]
  or?: JokeReportFilterInput[]
  id?: ComparableInt32OperationFilterInput
  description?: StringOperationFilterInput
  createdAt?: ComparableDateTimeOperationFilterInput
  reportedJoke?: JokeFilterInput
  reportingUser?: UserFilterInput
}
export type UserLoginInput = {
  firebaseUid: string
  username: string
}
export type JokeReportInput = {
  id: string
  description: string
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
export type JokeQueryInput = {
  deepLinkedJokeId?: string
  blockedCategoryIds?: string[]
  jokeLength: JokeLength
  profanityFilter: boolean
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
queryJokes="queryJokes",
queryCategories="queryCategories",
queryUserCategories="queryUserCategories",
queryUserJokeHistoryByUserId="queryUserJokeHistoryByUserId"
}
export enum RootStoreBaseMutations {
mutateRateJoke="mutateRateJoke",
mutateDeleteUserJokeHistory="mutateDeleteUserJokeHistory",
mutateUpdateUserJokeHistory="mutateUpdateUserJokeHistory",
mutateAddJokeReport="mutateAddJokeReport",
mutateLogin="mutateLogin",
mutateCompleteOnboarding="mutateCompleteOnboarding"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Joke', () => JokeModel], ['JokeReport', () => JokeReportModel], ['User', () => UserModel], ['Category', () => CategoryModel], ['UserJokeHistory', () => UserJokeHistoryModel], ['JokesConnection', () => JokesConnectionModel], ['CategoriesConnection', () => CategoriesConnectionModel], ['UserCategoriesConnection', () => UserCategoriesConnectionModel], ['UserJokeHistoryByUserIdConnection', () => UserJokeHistoryByUserIdConnectionModel], ['PageInfo', () => PageInfoModel], ['JokesEdge', () => JokesEdgeModel], ['CategoriesEdge', () => CategoriesEdgeModel], ['UserCategoriesEdge', () => UserCategoriesEdgeModel], ['UserJokeHistoryByUserIdEdge', () => UserJokeHistoryByUserIdEdgeModel], ['UserPayload', () => UserPayloadModel], ['MutateJokeReportPayload', () => MutateJokeReportPayloadModel], ['MutateUserJokeHistoryPayload', () => MutateUserJokeHistoryPayloadModel], ['UserError', () => UserErrorModel]], ['Joke', 'User', 'Category', 'UserJokeHistory'], "js"))
  .props({
    jokes: types.optional(types.map(types.late((): any => JokeModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    categories: types.optional(types.map(types.late((): any => CategoryModel)), {}),
    userJokeHistories: types.optional(types.map(types.late((): any => UserJokeHistoryModel)), {})
  })
  .actions(self => ({
    queryJokes(variables: { input: JokeQueryInput, first?: number, after?: string, last?: number, before?: string, where?: JokeFilterInput, order?: JokeSortInput[] }, resultSelector: string | ((qb: JokesConnectionModelSelector) => JokesConnectionModelSelector) = jokesConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ jokes: JokesConnectionModelType}>(`query jokes($input: JokeQueryInput!, $first: Int, $after: String, $last: Int, $before: String, $where: JokeFilterInput, $order: [JokeSortInput!]) { jokes(input: $input, first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new JokesConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCategories(variables: { first?: number, after?: string, last?: number, before?: string, where?: CategoryFilterInput, order?: CategorySortInput[] }, resultSelector: string | ((qb: CategoriesConnectionModelSelector) => CategoriesConnectionModelSelector) = categoriesConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ categories: CategoriesConnectionModelType}>(`query categories($first: Int, $after: String, $last: Int, $before: String, $where: CategoryFilterInput, $order: [CategorySortInput!]) { categories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new CategoriesConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUserCategories(variables: { first?: number, after?: string, last?: number, before?: string, where?: CategoryFilterInput, order?: CategorySortInput[] }, resultSelector: string | ((qb: UserCategoriesConnectionModelSelector) => UserCategoriesConnectionModelSelector) = userCategoriesConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userCategories: UserCategoriesConnectionModelType}>(`query userCategories($first: Int, $after: String, $last: Int, $before: String, $where: CategoryFilterInput, $order: [CategorySortInput!]) { userCategories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new UserCategoriesConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUserJokeHistoryByUserId(variables: { first?: number, after?: string, last?: number, before?: string, where?: UserJokeHistoryFilterInput, order?: UserJokeHistorySortInput[] }, resultSelector: string | ((qb: UserJokeHistoryByUserIdConnectionModelSelector) => UserJokeHistoryByUserIdConnectionModelSelector) = userJokeHistoryByUserIdConnectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userJokeHistoryByUserId: UserJokeHistoryByUserIdConnectionModelType}>(`query userJokeHistoryByUserId($first: Int, $after: String, $last: Int, $before: String, $where: UserJokeHistoryFilterInput, $order: [UserJokeHistorySortInput!]) { userJokeHistoryByUserId(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        ${typeof resultSelector === "function" ? resultSelector(new UserJokeHistoryByUserIdConnectionModelSelector()).toString() : resultSelector}
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
    mutateAddJokeReport(variables: { input: JokeReportInput }, resultSelector: string | ((qb: MutateJokeReportPayloadModelSelector) => MutateJokeReportPayloadModelSelector) = mutateJokeReportPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addJokeReport: MutateJokeReportPayloadModelType}>(`mutation addJokeReport($input: JokeReportInput!) { addJokeReport(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new MutateJokeReportPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { input: UserLoginInput }, resultSelector: string | ((qb: UserPayloadModelSelector) => UserPayloadModelSelector) = userPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: UserPayloadModelType}>(`mutation login($input: UserLoginInput!) { login(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCompleteOnboarding(variables?: {  }, resultSelector: string | ((qb: UserPayloadModelSelector) => UserPayloadModelSelector) = userPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ completeOnboarding: UserPayloadModelType}>(`mutation completeOnboarding { completeOnboarding {
        ${typeof resultSelector === "function" ? resultSelector(new UserPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
