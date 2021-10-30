import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { UserData, UserDataKeys, UserModel } from "app/models/user/user"
import { createUserStoreDefaultModel, UserStoreModel } from "./user-store"

const constantDate = new Date("Sun Oct 23 1994 20:11:15 GMT+0100 (British Summer Time)")

test("store can be created without any user", () => {
  const instance = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: constantDate,
    user: null,
  })
  expect(instance).toMatchSnapshot()
})

test("store can be created with user", () => {
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

test("can updateUser with FirebaseAuthTypes.User object and null", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: constantDate,
    user,
  })
  expect(store.user).toEqual(user)

  const fbuser = UserModel.create(FirebaseUserCredential)
  store.updateUser(FirebaseUserCredential)
  expect(store.user).toEqual(fbuser)

  store.updateUser(null)
  expect(store.user).toBeNull()
})

test("UserDataKeys extracts all keys", () => {
  expect(UserDataKeys).toMatchInlineSnapshot(`
    Array [
      "displayName",
      "email",
      "emailVerified",
      "isAnonymous",
      "metadata",
      "phoneNumber",
      "photoURL",
      "providerData",
      "providerId",
      "uid",
    ]
  `)
})

test("increaseGoodJokeCount increments count and reset will set to zero", () => {
  const store = createUserStoreDefaultModel().create()

  expect(store.goodJokeCount).toEqual(0)

  store.increaseGoodJokeCount()
  expect(store.goodJokeCount).toEqual(1)

  store.increaseGoodJokeCount()
  expect(store.goodJokeCount).toEqual(2)

  store.resetGoodJokecount()
  expect(store.goodJokeCount).toEqual(0)
})

// test("setLastDisplayedReviewPrompt defaults to todays date or sets parameter date", () => {})

test("completeOnboarding calls mutation and sets onboardingComplete to true", () => {
  const store = createUserStoreDefaultModel().create()
  // FIXME: need to setup jest fake timers so this is set in past to consistent value
  expect(store.lastDisplayedReviewPrompt).toBe(new Date())

  store.setLastDisplayedReviewPrompt(constantDate)
  expect(store.lastDisplayedReviewPrompt).toEqual(constantDate)
})

test("setOnboarding sets to parameter value", () => {
  const store = createUserStoreDefaultModel().create()

  expect(store.onboardingComplete).toEqual(false)

  // FIXME: need to mock out the api
  expect(store.user?.uid).toBeFalsy()
  store.completeOnboarding()
  expect(store.onboardingComplete).toEqual(false)

  expect(store.user?.uid).toBeTruthy()
  store.completeOnboarding()
  expect(store.onboardingComplete).toEqual(true)
})

test("login sets bearer token and calls each api call as expected", async () => {
  const store = createUserStoreDefaultModel().create()

  store.login(null)
  expect(store.user).toBeNull()
  // FIXME: after api mocking added we can add in all of the assertions for jests.fn().toBeCalled(0)

  await store.login(FirebaseUserCredential)

  expect(store.user).not.toBeNull()
})

test("deleteSelf calls mutation, and resets store if completes successfully", async () => {
  const store = createUserStoreDefaultModel().create()

  expect(store.user).not.toBeNull()
  await store.deleteSelf()
  // TODO: add rootstore assertion
})
