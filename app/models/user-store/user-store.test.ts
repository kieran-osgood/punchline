import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { RootStoreModel } from "app/models"
import { UserData, UserDataKeys, UserModel } from "app/models/user/user"
import { getSnapshot } from "mobx-state-tree"
import Toast from "react-native-toast-message"
import { createMockedRootStore, createMockedRootStoreWithApi } from "test/utils/components"
import DateUtils from "test/utils/date-utils"
import MockGraphQLClient, { Variables } from "test/__mocks__/mock-graphql-client"
import * as td from "testdouble"
import { createUserStoreDefaultModel, UserStoreModel } from "./user-store"

beforeEach(() => {
  DateUtils.advanceToPresent()
})

const getUserStore = () => {
  const rootStore = createMockedRootStore()
  return rootStore.userStore
}

test("store can be created without any user", () => {
  const instance = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: DateUtils.present,
    user: null,
  })
  expect(instance).toMatchSnapshot()
})

test("store can be created with user", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: DateUtils.present,
    user,
  })

  expect(store).toMatchSnapshot()
})

const FirebaseUserCredential: FirebaseAuthTypes.User = {
  ...td.object<FirebaseAuthTypes.User>(),
  displayName: "Kieran Osgood",
  email: "kieranbosgood@gmail.com",
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
  uid: "TMmPNUuxX8exkqiysZM7uHcQcQG2",
  getIdToken: () => Promise.resolve("idToken"),
}

test("can updateUser with FirebaseAuthTypes.User object and null", () => {
  const user = UserModel.create(UserData)
  const store = UserStoreModel.create({
    onboardingComplete: false,
    goodJokeCount: 0,
    lastDisplayedReviewPrompt: DateUtils.present,
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
  expect(store.lastDisplayedReviewPrompt).toEqual(DateUtils.present)

  store.setLastDisplayedReviewPrompt(DateUtils.future)
  expect(store.lastDisplayedReviewPrompt).toEqual(DateUtils.future)
})

describe(".login()", () => {
  const mockMutateLogin = (query: string, variables: Variables) => {
    expect(query).toMatchInlineSnapshot(`
      "mutation login($input: UserLoginInput!) { login(input: $input) {
              __typename
      user {

      __typename
      id
      id
      onboardingComplete
      firebaseUid
      categories {

      __typename
      id
      id
      image
      name

      }

      }

            } }"
    `)
    expect(variables).toEqual({
      input: {
        firebaseUid: FirebaseUserCredential.uid,
        username: FirebaseUserCredential.displayName,
      },
    })
    return {
      login: {
        user: {
          onboardingComplete: true,
        },
      },
    }
  }

  test("sets bearer token and calls each api call as expected", async () => {
    const mockClient = new MockGraphQLClient([mockMutateLogin])
    const root = createMockedRootStoreWithApi(undefined, mockClient)
    const { userStore, apiStore } = root
    expect(apiStore.api.accessToken).toBeNull()
    expect(userStore.user).toBeNull()

    await userStore.login(FirebaseUserCredential)
    expect(apiStore.api.accessToken).not.toBeNull()
    expect(userStore.user).not.toBeNull()

    await userStore.login(null)
    expect(userStore.user).toBeNull()
  })

  test("shows Toast and logs error if requests fail", async () => {
    const mockClient = new MockGraphQLClient([])
    const root = createMockedRootStoreWithApi(undefined, mockClient)
    const storeSnapshot = getSnapshot(RootStoreModel.create())
    const { userStore, apiStore } = root
    const toastShow = jest.fn()
    const spyToastShow = jest.spyOn(Toast, "show").mockImplementation(toastShow)

    expect(getSnapshot(root)).toMatchSnapshot(storeSnapshot)

    await userStore.login(FirebaseUserCredential)
    expect(apiStore.api.accessToken).toBeNull()
    expect(userStore.user).toBeNull()
    expect(spyToastShow).toHaveBeenCalledTimes(1)
    expect(getSnapshot(root)).toMatchSnapshot(storeSnapshot)
  })
})

describe(".completeOnboarding()", () => {
  const mockMutateCompleteOnboarding = (query: string, variables: Variables) => {
    expect(query).toMatchInlineSnapshot(`
      "mutation completeOnboarding { completeOnboarding {
              __typename

            } }"
    `)
    expect(variables).toEqual({})
    return {}
  }

  test("exits if user.uid not available", async () => {
    const mockClient = new MockGraphQLClient([mockMutateCompleteOnboarding])
    const root = createMockedRootStoreWithApi(undefined, mockClient)

    await root.userStore.completeOnboarding()
    expect(root.userStore.onboardingComplete).toBeFalsy()
  })

  test("calls mutateCompleteOnboarding and updates state", async () => {
    const mockClient = new MockGraphQLClient([mockMutateCompleteOnboarding])
    const root = createMockedRootStoreWithApi(
      {
        userStore: createUserStoreDefaultModel().create(),
      },
      mockClient,
    )
    root.userStore.updateUser(FirebaseUserCredential)
    expect(root.userStore.user?.uid).toBe(FirebaseUserCredential.uid)
    await root.userStore.completeOnboarding()
    expect(root.userStore.onboardingComplete).toBeTruthy()
  })
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
  // store.completeOnboarding()
  // expect(store.onboardingComplete).toEqual(true)
})

test("deleteSelf calls mutation, and resets store if completes successfully", async () => {
  // const store = getUserStore()
  // await store.deleteSelf()
  // TODO: add rootstore assertion
})
