import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { ApiRootStore } from "app/graphql"
import { AsyncStorage } from "app/utils/storage/async-storage"
import { applySnapshot, flow, getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { createOnboardingDefaultModel } from "../onboarding/onboarding"
import { createSettingsDefaultModel } from "../settings/settings"
import { createUserStoreDefaultModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
export const RootStoreModelBase = types.model("RootStore").props({
  userStore: createUserStoreDefaultModel(),
  settings: createSettingsDefaultModel(),
  onboarding: createOnboardingDefaultModel(),
  api: types.optional(ApiRootStore, {}),
})

export const RootStoreModel = RootStoreModelBase.actions((self) => {
  const initialState = getSnapshot(RootStoreModelBase.create({}))
  return {
    resetStore: flow(function* () {
      applySnapshot(self, initialState)
      yield AsyncStorage.clear().catch((err) => Sentry.captureException(err))
      yield auth()
        .signOut()
        .catch((err) => Sentry.captureException(err))
    }),
  }
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

// .actions(self => {
//   let initialState = {};
//   const afterCreate = () => {
//     initialState = getSnapshot(self);
//   };
//   const reset = () => {
//     applySnapshot(self, initialState);
//   }
// }

// export const resetStore = self => {
//   let initialState;
//   return {
//     afterCreate() {
//       initialState = getSnapshot(self);
//     },
//     resetStore() {
//       applySnapshot(self, initialState);
//     },
//   };
// };
