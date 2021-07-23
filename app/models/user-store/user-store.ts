import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { JokeLength } from "app/graphql"
import { RootStore } from "app/models"
import { JokeLengths, VerticalCheckboxesProps } from "components"
import { cast, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import R from "ramda"
import { withEnvironment } from "../extensions/with-environment"
import { UserDataKeys, UserModel } from "../user/user"

export const UserStoreModel = types
  .model("UserStore", {
    user: types.maybeNull(UserModel),
    jokeLengthPreferences: types.map(types.boolean),
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
      let largestJoke = 0
      self.jokeLengthPreferences.forEach((x, b) => {
        if (x) {
          switch (b) {
            case JokeLength.LARGE:
              largestJoke = largestJoke <= 3 ? 3 : largestJoke
            case JokeLength.MEDIUM:
              largestJoke = largestJoke <= 2 ? 2 : largestJoke
            case JokeLength.SMALL:
              largestJoke = largestJoke <= 1 ? 1 : largestJoke
          }
        }
      })

      return largestJoke
    },
    get checkboxMap(): VerticalCheckboxesProps["data"] {
      return JokeLengths.map((x) => ({
        label: x.slice(0, 1) + x.slice(1).toLowerCase(),
        value: x,
        isChecked: self.jokeLengthPreferences.get(x) ?? false,
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
        return
      }
      self.jokeLengthPreferences.set(value, isChecked ?? false)
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
