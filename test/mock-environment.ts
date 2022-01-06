import { Environment } from "app/models/environment"
import { createHttpClient } from "mst-gql"

export default class MockEnvironment extends Environment {
  constructor(client?: ReturnType<typeof createHttpClient>) {
    super()
    if (client) this.gqlHttpClient = client
  }
}
