import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { RootStore } from "app/models"
import { cast, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import R from "ramda"
import { withEnvironment } from "../extensions/with-environment"
import { UserDataKeys, UserModel } from "../user/user"

export const UserStoreModel = types
  .model("UserStore", {
    user: types.maybeNull(UserModel),
    onboardingComplete: types.boolean,
    goodJokeCount: types.number,
    lastDisplayedReviewPrompt: types.Date,
  })
  .extend(withEnvironment)
  .actions((self) => ({
    increaseGoodJokeCount() {
      ++self.goodJokeCount
    },
    setLastDisplayedReviewPrompt(date = new Date()) {
      self.lastDisplayedReviewPrompt = date
    },
    updateUser: (user: FirebaseAuthTypes.User | null) => {
      if (user === null) {
        self.user = null
        return
      }
      self.user = cast(R.pick(UserDataKeys, user))
    },
  }))
  .actions((self) => ({
    login: (credential: FirebaseAuthTypes.UserCredential) => {
      // TODO: add error handling
      const root = getRoot(self) as RootStore
      root.api.mutateLogin({
        input: {
          firebaseUid: credential.user.uid,
          username: credential.user.displayName ?? "Guest",
        },
      })

      self.updateUser(credential.user)
    },
    completeOnboarding: () => {
      const root = getRoot(self) as RootStore
      if (self.user?.uid) {
        root.api.mutateCompleteOnboarding({
          input: {
            firebaseUid: self.user.uid,
            username: self.user.displayName ?? "Guest",
          },
        })
        self.onboardingComplete = true
      }
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: new Date(),
  })
