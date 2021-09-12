import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { RootStore } from "app/models"
import { cast, flow, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
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
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
  }))
  .actions((self) => ({
    increaseGoodJokeCount() {
      ++self.goodJokeCount
    },
    resetGoodJokecount() {
      self.goodJokeCount = 0
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
    login: flow(function* (user: FirebaseAuthTypes.User | null) {
      self.updateUser(user)
      if (user === null) return

      const token = yield user.getIdToken()
      self.root.api.setBearerToken(token)

      // TODO: add error handling
      // Creates a user on the backend and updates users LastLogin date if already exists
      self.root.api.mutateLogin({
        input: {
          firebaseUid: user.uid,
          username: user.displayName ?? "Guest",
        },
      })
      self.root.api.queryUserCategories({}, (c) => c.nodes((n) => n.id.image.name))
    }),
    completeOnboarding: () => {
      if (self.user?.uid) {
        self.root.api.mutateCompleteOnboarding({}, undefined, () => {
          self.onboardingComplete = true
        })
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
