import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import * as Sentry from "@sentry/react-native"
import { categoryModelPrimitives, nodes, SortEnumType } from "app/graphql"
import { RootStore } from "app/models"
import { cast, getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import R from "ramda"
import Toast from "react-native-toast-message"
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
    setOnboarding(value: boolean) {
      self.onboardingComplete = value
    },
  }))
  .actions((self) => ({
    async login(user: FirebaseAuthTypes.User | null) {
      if (user === null) {
        self.updateUser(null)
        return
      }

      try {
        const token = await user.getIdToken()
        self.root.apiStore.api.setBearerToken(token)

        // TODO: add error handling
        // Creates a user on the backend and updates users LastLogin date if already exists
        const loginResponse = await self.root.apiStore.api.mutateLogin(
          {
            input: {
              firebaseUid: user.uid,
              username: user.displayName ?? "Guest",
            },
          },
          (l) =>
            l.user((u) => u.id.onboardingComplete.firebaseUid.categories((c) => c.id.image.name)),
        ).promise

        if (loginResponse.login.user.onboardingComplete) self.setOnboarding(true)

        self.updateUser(user)

        self.root.apiStore.api.queryCategories(
          {
            order: [{ name: SortEnumType.ASC }],
          },
          nodes(categoryModelPrimitives),
        )

        self.root.apiStore.api.queryJokes(
          {
            input: {
              blockedCategoryIds: self.root.settings.blockedCategoryIds,
              jokeLength: self.root.settings.jokeLengthMaxEnum,
              deepLinkedJokeId: self.root.apiStore.jokeApi.deepLinkJokeId,
              profanityFilter: self.root.settings.profanityFilter,
            },
            first: 5,
          },
          (j) =>
            j.nodes((n) =>
              n.id.body.title.length.negativeRating.positiveRating.categories(
                (c) => c.id.image.name,
              ),
            ),
          { fetchPolicy: "no-cache" },
        )
      } catch (err) {
        const { message, name, stack } = err as Error
        console.log("message: ", message)
        console.log("name: ", name)
        console.log("stack: ", stack)

        self.updateUser(null)
        auth().signOut()
        Sentry.captureException(err)
        // Add a modal pop up
        // self.root.resetStore()
        Toast.show({
          type: "error",
          text1: "Sign-in Error",
          text2:
            "We're having trouble signing you in right now. Please try again, or contact support if the issue persists.",
          position: "bottom",
        })
      }
    },
    completeOnboarding: () => {
      if (self.user?.uid) {
        self.root.apiStore.api.mutateCompleteOnboarding({}, undefined, () => {
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
