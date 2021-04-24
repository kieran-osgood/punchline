import * as React from "react"
import { useQuery } from "app/graphql/reactUtils"
import { RootStoreType } from "app/graphql/RootStore"
import { QueryLike, UseQueryHookResult } from "mst-gql"
import { RootStoreBaseMutations, RootStoreBaseQueries } from 'app/graphql/RootStore.base'

type ActionNames = (keyof typeof RootStoreBaseQueries | keyof typeof RootStoreBaseMutations)

type ActionReturnType <T extends ActionNames> = ReturnType<RootStoreType[T]>

const useReactiveQuery = <ActionName extends ActionNames>(
  queryRequest: ActionReturnType<ActionName>,
  dependencies: any[] = [],
): ActionReturnType<ActionName> => {
  const query = useQuery(queryRequest)
  const { setQuery } = query

  React.useEffect(() => {
    setQuery(queryRequest)
  }, dependencies)

  // return query as ActionReturnType<ActionName>
  return query
}

export default useReactiveQuery
