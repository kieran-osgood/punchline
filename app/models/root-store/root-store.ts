import { RootStore as ApiRootStore } from "app/graphql"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createSettingsDefaultModel } from "../settings/settings"
import { createUserStoreDefaultModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  userStore: createUserStoreDefaultModel(),
  settings: createSettingsDefaultModel(),
  api: types.optional(ApiRootStore, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
