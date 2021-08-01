import { jokeModelPrimitives } from "app/graphql"
import { RootStore as RootStoreTree } from "app/models"
import { destroy, getEnv, getRoot, IAnyStateTreeNode, Instance, types } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  accessToken: types.maybeNull(types.string),
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
  }))
  .actions((self) => ({
    setBearerToken(token: string) {
      self.accessToken = token
      self.setAuthorizationHeader()
    },
    fetchMoreJokes() {
      const query = self.queryJokes(
        {
          blockedCategoryIds: self.root.userStore.blockedCategoryIds,
          jokeLength: self.root.userStore.jokeLengthMaxEnum,
        },
        nodes(jokeModelPrimitives),
        { fetchPolicy: "no-cache" },
      )
      return query
    },
  }))
  .views((self) => ({
    get nonViewedJokes() {
      return [...self.jokes.values()].filter((x) => !x.viewed)
    },
    get topOfDeckJoke() {
      if (this.nonViewedJokes.length <= 10) {
        self.fetchMoreJokes()
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
