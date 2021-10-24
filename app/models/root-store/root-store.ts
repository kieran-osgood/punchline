import auth from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { AsyncStorage } from "app/utils/storage/async-storage"
import { applySnapshot, flow, getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
// ! FIGURE OUT WHY THIS DOESNT LIKE IMPORTING FROM APP/MODELS - INVARIANT VIOLATION
import { createApiStoreDefaultModel } from "../api-store/api-store"
import { createOnboardingDefaultModel } from "../onboarding/onboarding"
import { createSettingsDefaultModel } from "../settings/settings"
import { createUserStoreDefaultModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
export const RootStoreModelBase = types.model("RootStore").props({
  userStore: types.late(() => createUserStoreDefaultModel()),
  settings: types.late(() => createSettingsDefaultModel()),
  onboarding: types.late(() => createOnboardingDefaultModel()),
  apiStore: types.late(() => createApiStoreDefaultModel()),
})

export const RootStoreModel = RootStoreModelBase.actions((self) => {
  const initialState = getSnapshot(RootStoreModelBase.create({}))
  return {
    resetStore: flow(function* () {
      applySnapshot(self, initialState)
      AsyncStorage.clear().catch((err) => Sentry.captureException(err))
      auth()
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
