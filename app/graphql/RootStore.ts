import { Instance, getEnv, types } from "mobx-state-tree"
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
  .actions((self) => ({
    setBearerToken(token: string) {
      self.accessToken = token
      self.setAuthorizationHeader()
    },
  }))

export const nodes = (val: any) => `nodes {${val}}`
