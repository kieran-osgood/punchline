import { ApiRootStoreType } from "app/graphql"
import { JokeReportInput } from "app/graphql/RootStore.base"
import { RootStore, SettingsType } from "app/models"
import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const JokeReportStoreModel = types
  .model("JokeReportStore")
  .props({})
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
    get settings(): SettingsType {
      return this.root.settings
    },
    get api(): ApiRootStoreType {
      return this.root.apiStore.api
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    sendJokeReport(input: JokeReportInput) {
      return self.api.mutateAddJokeReport({ input })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type JokeReportStoreType = Instance<typeof JokeReportStoreModel>
export interface JokeReportStore extends JokeReportStoreType {}
type JokeReportStoreSnapshotType = SnapshotOut<typeof JokeReportStoreModel>
export interface JokeReportStoreSnapshot extends JokeReportStoreSnapshotType {}
export const createJokeReportStoreDefaultModel = () => types.optional(JokeReportStoreModel, {})
