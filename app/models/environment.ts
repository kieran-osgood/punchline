import { isDevelopment } from "app/utils/current-environment"
import { createHttpClient } from "mst-gql"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { API_URL } from "react-native-dotenv"

let ReactotronDev: any
if (isDevelopment) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (isDevelopment) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.gqlHttpClient = createHttpClient(`${API_URL}/graphql`)
  }

  async setup() {
    // allow each service to setup

    if (isDevelopment) {
      await this.reactotron.setup()
    }
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev
  gqlHttpClient: ReturnType<typeof createHttpClient>
}
