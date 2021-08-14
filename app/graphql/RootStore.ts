import { JokeModel, jokeModelPrimitives } from "app/graphql"
import { RootStore as RootStoreTree } from "app/models"
import { destroy, getEnv, getRoot, IAnyStateTreeNode, Instance, types } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  accessToken: types.maybeNull(types.string),
  deepLinkJokeId: types.maybeNull(types.string),
})
  .views((self) => ({
    get root(): RootStoreTree {
      return getRoot(self)
    },
  }))
  .actions((self) => ({
    removeChild(item: IAnyStateTreeNode) {
      destroy(item)
    },
    setAuthorizationHeader() {
      getEnv(self).gqlHttpClient.setHeaders({ Authorization: "bearer " + self.accessToken })
    },
    setDeepLinkJoke(deepLinkInitialJoke: string | null) {
      self.deepLinkJokeId = deepLinkInitialJoke
    },
  }))
  .actions((self) => ({
    setBearerToken(token: string) {
      self.accessToken = token
      self.setAuthorizationHeader()
    },
    fetchInitialJokes(deepLinkInitialJoke?: string) {
      deepLinkInitialJoke = "Sm9rZQppNg=="
      const query = self.queryJokes(
        {
          blockedCategoryIds: self.root.userStore.blockedCategoryIds,
          jokeLength: self.root.userStore.jokeLengthMaxEnum,
          deepLinkedJokeId: deepLinkInitialJoke,
        },
        nodes(jokeModelPrimitives),
        { fetchPolicy: "no-cache" },
      )

      self.setDeepLinkJoke(deepLinkInitialJoke)

      return query
    },
  }))
  .views((self) => ({
    get nonViewedJokes() {
      return [...self.jokes.values()].filter((x) => !x.viewed)
    },
    get topOfDeckJoke() {
      if (this.nonViewedJokes.length <= 10) {
        self.fetchInitialJokes()
      }
      if (this.nonViewedJokes.length === 0) {
        return JokeModel.create({ id: "-1" })
      }
      if (self.deepLinkJokeId) {
        const id = self.deepLinkJokeId
        self.setDeepLinkJoke(null)
        const deepJoke = self.jokes.get(id)
        return deepJoke ?? this.nonViewedJokes[this.nonViewedJokes.length - 1]
      }

      return this.nonViewedJokes[this.nonViewedJokes.length - 1]
    },
  }))

export const nodes = (val: any, ...rest: string[]) =>
  `nodes {
    ${val}
    ${rest.join(" ")}
  } 
  `
