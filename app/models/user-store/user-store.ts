import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { JokeLength } from "app/graphql"
import { RootStore } from "app/models"
import { JokeLengths, VerticalCheckboxesProps } from "components"
import { cast, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import R from "ramda"
import Toast from "react-native-toast-message"
import { withEnvironment } from "../extensions/with-environment"
import { UserDataKeys, UserModel } from "../user/user"

export const UserStoreModel = types
  .model("UserStore", {
    user: types.maybeNull(UserModel),
    jokeLengthPreferences: types.map(types.boolean),
    onboardingComplete: types.boolean,
  })
  .extend(withEnvironment)
  .views((self) => ({
    get blockedCategoryIds(): string[] {
      const root = [...(getRoot(self) as RootStore).api.categories.values()]
        .filter((x) => x.isActive)
        .map((x) => x.id)
      return root
    },
    get jokeLengthMax(): number {
      let largestJoke = 1
      self.jokeLengthPreferences.forEach((x, b) => {
        if (!x) return

        switch (b) {
          case JokeLength.LARGE:
            largestJoke = largestJoke <= 3 ? 3 : largestJoke
            break
          case JokeLength.MEDIUM:
            largestJoke = largestJoke <= 2 ? 2 : largestJoke
            break
          case JokeLength.SMALL:
            largestJoke = largestJoke <= 1 ? 1 : largestJoke
            break
        }
      })

      return largestJoke
    },
    get jokeLengthMaxEnum(): JokeLength {
      switch (this.jokeLengthMax) {
        case 3:
          return JokeLength.LARGE
        case 2:
          return JokeLength.MEDIUM
        case 1:
          return JokeLength.SMALL
      }

      return JokeLength.SMALL
    },
    get checkboxMap(): VerticalCheckboxesProps["data"] {
      return JokeLengths.map((x, idx) => ({
        label: x.slice(0, 1) + x.slice(1).toLowerCase(),
        value: x,
        isChecked: self.jokeLengthPreferences.get(x) ?? idx === 0,
      }))
    },
  }))
  .actions((self) => ({
    updateUser: (user: FirebaseAuthTypes.User | null) => {
      if (user === null) {
        self.user = null
        return
      }
      self.user = cast(R.pick(UserDataKeys, user))
    },
    toggleJokeLength: (value: JokeLength, isChecked?: boolean) => {
      const oneJokeIsTrue =
        [...self.jokeLengthPreferences.values()].reduce((a, b) => Number(a) + Number(b), 0) === 1
      if (oneJokeIsTrue && self.jokeLengthPreferences.get(value) === true) {
        // Ensure at least 1 joke is true
        return Toast.show({
          type: "error",
          text1: "Woops!",
          text2: "You must have at least (1) length selected.",
          position: "bottom",
        })
      }
      self.jokeLengthPreferences.set(value, isChecked ?? false)
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
    jokeLengthPreferences: {
      [JokeLength.SMALL]: true,
    },
  })
