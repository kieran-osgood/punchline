import { NavigationContainer } from "@react-navigation/native"
import { RootStore, RootStoreModel, RootStoreProvider } from "app/models"
import { Environment } from "app/models/environment"
import React from "react"
import { ViewProps } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { View } from "react-native-ui-lib"

const createRootStore = (initialData: any = {}): RootStore =>
  RootStoreModel.create(initialData, new Environment())

const TestChildComponent = (props: ViewProps) => <View {...props} />

type RenderDefaultAppProps = {
  propRootStore?: RootStore
  children: React.ReactNode
}
const RenderDefaultApp = ({ children, propRootStore }: RenderDefaultAppProps) => {
  const rootStore = propRootStore || createRootStore()
  return (
    <>
      <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
        <NavigationContainer>
          <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  )
}

export { createRootStore, TestChildComponent, RenderDefaultApp }
