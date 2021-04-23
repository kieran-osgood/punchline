/**
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
// import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore, useStores } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import auth from "@react-native-firebase/auth"
import { StoreContext, useQuery } from "./graphql/reactUtils"
import { observer } from "mobx-react-lite"
import ServiceProvider from "./utils/service-provider"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const Services = new ServiceProvider()

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
  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      // await initFonts() // expo
      setupRootStore().then((newRootStore) => {
        newRootStore.userStore?.updateUser(auth().currentUser)
        setRootStore(newRootStore)
      })
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <StoreContext.Provider value={Services.rootGraphqlStore}>
          <Authorization>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </SafeAreaProvider>
          </Authorization>
        </StoreContext.Provider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
})

export default App

const Authorization = ({ children }) => {
  const { userStore } = useStores()
  const { store, setQuery } = useQuery()

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      userStore.updateUser(user)
      user?.getIdToken().then((idToken) => {
        store.setBearerToken(idToken)

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

  return <>{children}</>
}
