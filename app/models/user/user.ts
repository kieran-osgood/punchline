import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NonFunctionProperties } from "types"
// FIXME: rename this to firebase user to match what the intent is
type UserDataType = NonFunctionProperties<FirebaseAuthTypes.User>
export const UserData: UserDataType = {
  displayName: "",
  email: "",
  emailVerified: false,
  isAnonymous: false,
  metadata: {
    creationTime: "",
    lastSignInTime: "",
  },
  phoneNumber: "",
  photoURL: "",
  providerData: [],
  providerId: "",
  uid: "",
}

// Used for R.pick to extract properties from the FirebaseAuthTypes.UserCredential
export const UserDataKeys = Object.keys(UserData)

/**
 * Currently Authenticated Users Firebase Information .
 */
export const UserModel = types
  .model("User")
  .props({
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    emailVerified: types.boolean,
    isAnonymous: types.boolean,
    metadata: types.model({
      creationTime: types.maybe(types.string),
      lastSignInTime: types.maybe(types.string),
    }),
    phoneNumber: types.maybeNull(types.string),
    photoURL: types.maybeNull(types.string),
    providerData: types.frozen(),
    providerId: types.string,
    uid: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, UserData)
