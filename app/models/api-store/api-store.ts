import { createApiRootStoreDefaultModel } from "app/graphql"
import { createJokeApiStoreDefaultModel } from "app/models/joke-api-store/joke-api-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ApiStoreModel = types
  .model("ApiStore")
  .props({
    api: createApiRootStoreDefaultModel(),
    jokeApi: createJokeApiStoreDefaultModel(),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ApiStoreType = Instance<typeof ApiStoreModel>
export interface ApiStore extends ApiStoreType {}
type ApiStoreSnapshotType = SnapshotOut<typeof ApiStoreModel>
export interface ApiStoreSnapshot extends ApiStoreSnapshotType {}
export const createApiStoreDefaultModel = () => types.optional(ApiStoreModel, {})
