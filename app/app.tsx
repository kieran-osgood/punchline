/**
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import auth from "@react-native-firebase/auth"
import { NavigationContainerRef } from "@react-navigation/native"
import { categoryModelPrimitives, nodes } from "app/graphql"
import { StoreContext as GraphQLStoreContext, useQuery } from "app/graphql/reactUtils"
import { RootStore, RootStoreProvider, setupRootStore, useStores } from "app/models"
import { AsyncStorage } from "app/utils/storage/async-storage"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import "./i18n"
import {
  canExit,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "./navigators"
import "./utils/ignore-warnings"
// import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App = observer(function App() {
  const navigationRef = useRef<NavigationContainerRef | null>(null)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then((newRootStore) => {
        newRootStore.userStore?.updateUser(auth().currentUser)
        setRootStore(newRootStore)
      })
    })()
  }, [])

  const resetStores = async () => {
    try {
      await AsyncStorage.clear()
      await auth().signOut()

      const newRootStore = await setupRootStore()
      newRootStore.userStore?.updateUser(auth().currentUser)
      setRootStore(newRootStore)
    } catch (error) {
      __DEV__ && console.tron.log!("error logging out: ", error)
    }
  }

  // Wait for state to load from AsyncStorage
  if (!rootStore || !rootStore.api) return null

  return (
    <ToggleStorybook>
      <RootStoreProvider value={{ ...rootStore, resetStores }}>
        <GraphQLStoreContext.Provider value={rootStore.api}>
          <Authorization>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </SafeAreaProvider>
          </Authorization>
        </GraphQLStoreContext.Provider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
})

export default App

const Authorization = ({ children }: { children: React.ReactNode }) => {
  const { userStore } = useStores()
  const { store, setQuery } = useQuery()
  useQuery((store) => store.queryCategories({}, nodes(categoryModelPrimitives)))

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      userStore.updateUser(user)
      user?.getIdToken().then((idToken) => {
        store.setBearerToken(idToken)

        // Creates a user on the backend and updates users LastLogin date if already exists
        setQuery((store) =>
          store.mutateLogin({
            input: {
              firebaseUid: user.uid,
              username: user.displayName ?? "",
            },
          }),
        )
      })
    })

    return () => unsubscribe()
  }, [])

  // if (store.accessToken == null) return null

  return <>{children}</>
}
