import { NavigationContainer } from "@react-navigation/native"
import { CategoryModel, JokeModel, UserJokeHistoryModel, UserModel } from "app/graphql"
import { StoreContext as GraphQLStoreContext } from "app/graphql/reactUtils"
import useAuthorization from "app/hooks/use-authorization"
import { RootStore, RootStoreModel, RootStoreProvider } from "app/models"
import { SnapshotOut } from "mobx-state-tree"
import { createHttpClient } from "mst-gql"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { View, ViewProps } from "react-native-ui-lib"
import MockEnvironment from "test/__mocks__/mock-environment"

type Key = string | number
export type InitialData = Parameters<typeof RootStoreModel.create>[0] &
  Partial<{
    apiStore: Partial<{
      api: Partial<{
        categories: Record<Key, SnapshotOut<typeof CategoryModel>>
        jokes: Record<Key, SnapshotOut<typeof JokeModel>>
        users: Record<Key, SnapshotOut<typeof UserModel>>
        userJokeHistories: Record<Key, SnapshotOut<typeof UserJokeHistoryModel>>
      }>
    }>
  }>
const createMockedRootStore = (initialData?: InitialData): RootStore =>
  RootStoreModel.create(initialData, new MockEnvironment())

const createMockedRootStoreWithApi = (
  initialData: InitialData | undefined,
  client: ReturnType<typeof createHttpClient>,
): RootStore => RootStoreModel.create(initialData, new MockEnvironment(client))

type RenderDefaultAppProps = {
  propRootStore?: RootStore
  children: React.ReactNode
}
const RenderDefaultApp = ({ children, propRootStore }: RenderDefaultAppProps) => {
  const [rootStore] = React.useState<RootStore>(
    propRootStore || createMockedRootStoreWithApi(undefined, createHttpClient("")),
  )

  return (
    <>
      <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
        <NavigationContainer>
          <RootStoreProvider value={rootStore}>
            <GraphQLStoreContext.Provider value={rootStore.apiStore.api}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>{children}</SafeAreaProvider>
            </GraphQLStoreContext.Provider>
          </RootStoreProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  )
}

const TestChildComponent = (props: ViewProps) => <View {...props} />

export { createMockedRootStoreWithApi, createMockedRootStore, TestChildComponent, RenderDefaultApp }

export const AuthWrapper = ({ children }: { children: RenderDefaultAppProps["children"] }) => {
  useAuthorization()

  return <>{children}</>
}

export function failIfFalsy<T>(value: T): asserts value is NonNullable<T> {
  if (!value) fail()
}
