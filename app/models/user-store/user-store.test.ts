import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { UserData, UserModel } from "app/models/user/user"
import { UserStoreModel } from "./user-store"

const constantDate = new Date("Sun Oct 23 1994 20:11:15 GMT+0100 (British Summer Time)")

test("can be created without any user", () => {
  const instance = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: constantDate,
    user: null,
  })
  expect(instance).toMatchSnapshot()
})

test("can be created with user", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: constantDate,
    user,
  })

  expect(store).toMatchSnapshot()
})

const FirebaseUserCredential: FirebaseAuthTypes.User = {
  displayName: "display me",
  email: "email@gmail.com",
  emailVerified: false,
  isAnonymous: true,
  metadata: {
    creationTime: "1619118612167",
    lastSignInTime: "1619118612167",
  },
  phoneNumber: null,
  photoURL: null,
  providerData: [],
  providerId: "firebase",
  uid: "89PMk9NNPnMyv7fuoQMhKTjZRiA2",
  updateProfile: jest.fn(),
  verifyBeforeUpdateEmail: jest.fn(),
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  linkWithCredential: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  reload: jest.fn(),
  sendEmailVerification: jest.fn(),
  unlink: jest.fn(),
  toJSON: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  updatePhoneNumber: jest.fn(),
}

test("can updateUser with FirebaseAuthTypes.User object", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: constantDate,
    user,
  })

  store.updateUser(FirebaseUserCredential)
  expect(store).toMatchSnapshot()
})
