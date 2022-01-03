import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { UserData, UserDataKeys, UserModel } from "app/models/user/user"
import { advanceTo } from "jest-date-mock"
import { createRootStore } from "test/utils"
import * as td from "testdouble"
import { UserStoreModel } from "./user-store"

const rootDate = new Date("Sun Oct 23 1994 20:11:15 GMT+0100 (British Summer Time)")
const adjustedDate = new Date("Sun Jan 03 2022 20:11:15 GMT+0100 (British Summer Time)")

beforeEach(() => {
  advanceTo(rootDate) // reset to date time.
})

const getUserStore = () => {
  const rootStore = createRootStore()
  return rootStore.userStore
}

test("store can be created without any user", () => {
  const instance = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: rootDate,
    user: null,
  })
  expect(instance).toMatchSnapshot()
})

test("store can be created with user", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: rootDate,
    user,
  })

  expect(store).toMatchSnapshot()
})

const FirebaseUserCredential: FirebaseAuthTypes.User = {
  ...td.object<FirebaseAuthTypes.User>(),
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
}

test("can updateUser with FirebaseAuthTypes.User object and null", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: rootDate,
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
  const store = getUserStore()

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
  const store = getUserStore()
  expect(store.lastDisplayedReviewPrompt).toEqual(rootDate)

  store.setLastDisplayedReviewPrompt(adjustedDate)
  expect(store.lastDisplayedReviewPrompt).toEqual(adjustedDate)
})

// START Group: UserStoreModel
// TODO: share the store for these two to avoid duplicating the login bit
test("login sets bearer token and calls each api call as expected", async () => {
  const store = getUserStore()

  store.login(null)
  expect(store.user).toBeNull()
  // FIXME: after api mocking added we can add in all of the assertions for jests.fn().toBeCalled(0)
  // await store.login(FirebaseUserCredential)

  // expect(store.user).not.toBeNull()
})

test("setOnboarding sets to parameter value", () => {
  const store = getUserStore()
  expect(store.onboardingComplete).toEqual(false)

  expect(store.user?.uid).toBeFalsy()
  expect(store.onboardingComplete).toEqual(false)

  store.completeOnboarding()
  expect(store.user?.uid).toBeFalsy()

  // FIXME: need to mock out the api
  store.login(FirebaseUserCredential)
  // console.log("store: ", store.user)
  // store.completeOnboarding()
  // expect(store.onboardingComplete).toEqual(true)
})
// END Group: UserStoreModel

test("deleteSelf calls mutation, and resets store if completes successfully", async () => {
  // const store = getUserStore()
  // await store.deleteSelf()
  // TODO: add rootstore assertion
})
