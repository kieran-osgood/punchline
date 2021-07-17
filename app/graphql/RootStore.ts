import { values } from "mobx"
import { getEnv, Instance, types } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  accessToken: types.maybeNull(types.string),
})
  .actions((self) => ({
    setAuthorizationHeader() {
      getEnv(self).gqlHttpClient.setHeaders({ Authorization: "bearer " + self.accessToken })
    },
  }))
  .views((self) => ({
    get blockedCategoryIds() {
      return values(self.categories)
        .filter((x) => x.isActive)
        .map((x) => x.id)
    },
  }))
  .actions((self) => ({
    setBearerToken(token: string) {
      self.accessToken = token
      self.setAuthorizationHeader()
    },
  }))

export const nodes = (val: any, ...rest: string[]) =>
  `nodes {
    ${val}
    ${rest.join(" ")}
  } 
  `
