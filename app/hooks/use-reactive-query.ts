import { useQuery } from "app/graphql/reactUtils"
import { RootStoreType } from "app/graphql/RootStore"
import { RootStoreBaseMutations, RootStoreBaseQueries } from "app/graphql/RootStore.base"
import * as React from "react"

type ActionNames = keyof typeof RootStoreBaseQueries | keyof typeof RootStoreBaseMutations
type ActionReturnType<T extends ActionNames> = ReturnType<RootStoreType[T]>

const useReactiveQuery = <ActionName extends ActionNames>(
  queryRequest: ActionReturnType<ActionName>,
  dependencies: any[] = [],
): ActionReturnType<ActionName> => {
  const query = useQuery(queryRequest)
  const { setQuery } = query

  React.useEffect(() => {
    setQuery(queryRequest)
  }, dependencies)

  return query as ActionReturnType<ActionName>
}

export default useReactiveQuery
