import { JokeLength } from "app/graphql"
import { RootStore } from "app/models"
import { destroy, getEnv, getRoot, IAnyStateTreeNode, Instance, types } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface ApiRootStoreType extends Instance<typeof ApiRootStore.Type> {}
export interface RootStoreType extends Instance<typeof ApiRootStore.Type> {}

export const ApiRootStore = RootStoreBase.props({
  accessToken: types.maybeNull(types.string),
})
  .views((self) => ({
    get root(): RootStore {
      return getRoot(self)
    },
  }))
  .actions((self) => ({
    setAuthorizationHeader() {
      getEnv(self).gqlHttpClient.setHeaders({ Authorization: "bearer " + self.accessToken })
    },
    setBearerToken(token: string) {
      self.accessToken = token
      this.setAuthorizationHeader()
    },
    removeChild(item: IAnyStateTreeNode) {
      destroy(item)
    },
    getQueryJokes() {
      return self.queryJokes({
        input: {
          jokeLengths: [JokeLength.LARGE, JokeLength.MEDIUM, JokeLength.SMALL],
          profanityFilter: false,
          blockedCategoryIds: [],
        },
      })
    },
  }))

export const nodes = (val: any, ...rest: string[]) => `nodes {
    ${val}
    ${rest.join(" ")}
  } 
  `

export const createApiRootStoreDefaultModel = () => types.optional(ApiRootStore, {})
