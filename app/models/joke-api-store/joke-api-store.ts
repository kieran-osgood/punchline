import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const JokeApiStoreModel = types
  .model("JokeApiStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type JokeApiStoreType = Instance<typeof JokeApiStoreModel>
export interface JokeApiStore extends JokeApiStoreType {}
type JokeApiStoreSnapshotType = SnapshotOut<typeof JokeApiStoreModel>
export interface JokeApiStoreSnapshot extends JokeApiStoreSnapshotType {}
export const createJokeApiStoreDefaultModel = () => types.optional(JokeApiStoreModel, {})
