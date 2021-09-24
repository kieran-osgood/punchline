import { JokeModel } from "app/graphql"
import { RootStore, SettingsType } from "app/models"
import { destroy, getEnv, getRoot, IAnyStateTreeNode, Instance, types } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface ApiStoreType extends Instance<typeof ApiRootStore.Type> {}

export const ApiRootStore = RootStoreBase.props({
  accessToken: types.maybeNull(types.string),
  deepLinkJokeId: types.maybe(types.string),
})
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
    get settings(): SettingsType {
      return this.root.settings
    },
  }))
  .actions((self) => ({
    removeChild(item: IAnyStateTreeNode) {
      destroy(item)
    },
    setAuthorizationHeader() {
      getEnv(self).gqlHttpClient.setHeaders({ Authorization: "bearer " + self.accessToken })
    },
    setDeepLinkJoke(deepLinkInitialJoke: string | undefined) {
      self.deepLinkJokeId = deepLinkInitialJoke
    },
    setBearerToken(token: string) {
      self.accessToken = token
      this.setAuthorizationHeader()
    },
  }))
  .views((self) => ({
    get nonViewedJokes() {
      return [...self.jokes.values()]
        .filter((x) => !x.viewed)
        .filter((x) => !(self.settings.profanityFilter && x.explicitContent))
        .filter((x) => x.categories.some((y) => !y.isFiltered && self.categories.has(y.id)))
    },
    get topOfDeckJoke() {
      if (this.nonViewedJokes.length <= 10) {
        self.queryJokes(
          {
            input: {
              blockedCategoryIds: self.root.settings.blockedCategoryIds,
              jokeLength: self.root.settings.jokeLengthMaxEnum,
              deepLinkedJokeId: self.deepLinkJokeId,
              profanityFilter: self.root.settings.profanityFilter,
            },
          },
          (j) =>
            j.nodes((n) =>
              n.id.body.title.negativeRating.positiveRating.categories((c) => c.id.image.name),
            ),
          { fetchPolicy: "no-cache" },
        )
      }
      if (this.nonViewedJokes.length === 0) {
        return JokeModel.create({ id: "-1" })
      }
      if (self.deepLinkJokeId) {
        const id = self.deepLinkJokeId
        self.setDeepLinkJoke(undefined)
        const deepJoke = self.jokes.get(id)
        return deepJoke ?? this.nonViewedJokes[this.nonViewedJokes.length - 1]
      }

      return this.nonViewedJokes[this.nonViewedJokes.length - 1]
    },
    get bookmarkedJokes() {
      return [...self.userJokeHistories.values()].filter((x) => x.bookmarked)
    },
  }))

export const nodes = (val: any, ...rest: string[]) =>
  `nodes {
    ${val}
    ${rest.join(" ")}
  } 
  `

export const createApiRootStoreDefaultModel = () => types.optional(ApiRootStore, {})
