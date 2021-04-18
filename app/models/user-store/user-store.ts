import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserDataKeys, UserModel } from "../user/user"
import { withEnvironment } from "../extensions/with-environment"
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import R from 'ramda'

export const UserStoreModel = types
  .model("UserStore", {
    user: types.maybeNull(UserModel),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    updateUser: (user: FirebaseAuthTypes.User | null) => {
      if (user === null) { self.user = null; return }
      self.user = cast(R.pick(UserDataKeys, user))
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
