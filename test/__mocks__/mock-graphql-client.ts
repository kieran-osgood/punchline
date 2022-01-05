import { GraphQLClient } from "mst-gql/node_modules/graphql-request"

type RequestParameters = Parameters<GraphQLClient["request"]>
export type Query = RequestParameters[0]
export type Variables = RequestParameters[1]

export type RequestFunction = (query: Query, variables: Variables) => any

export default class MockGraphQLClient extends GraphQLClient {
  requests: Array<RequestFunction> = []

  constructor(requests: Array<RequestFunction> = []) {
    super("http://localhost:5000/graphql", undefined)
    this.requests = requests
  }

  override request<T>(query: Query, variables?: Variables): Promise<T> {
    if (this.requests.length === 0) return Promise.reject(new Error("No more requests"))
    return Promise.resolve((this.requests.shift() as RequestFunction)(query, variables)) // return and remove the first mocked response
  }
}
