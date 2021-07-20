import { RootStore } from "app/graphql"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createUserStoreDefaultModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: createUserStoreDefaultModel(),
  api: types.optional(RootStore, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
