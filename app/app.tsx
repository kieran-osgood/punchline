/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"

import admob, { MaxAdContentRating } from "@react-native-firebase/admob"
import { GoogleSignin } from "@react-native-community/google-signin"
import auth from "@react-native-firebase/auth"
import { RootStore as RootGraphqlStore } from "./graphql/RootStore"
import { StoreContext } from "./graphql/reactUtils"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { observer } from "mobx-react-lite"
import { createHttpClient } from 'mst-gql'
import * as Sentry from "@sentry/react-native"

const packageJson = require('../package.json')
Sentry.init({
  dsn: "https://14d48ec94bab4f1fa583a3b6ab7f7a3b@o577022.ingest.sentry.io/5731300",
  release: 'com.ko.punchline@' + packageJson.version,
  environment: process.env.NODE_ENV,
  attachStacktrace: true,
  autoSessionTracking: true,
  enabled: !__DEV__,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

enableScreens()

admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.T,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: false,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })

GoogleSignin.configure({
  webClientId: "681986405885-dhai19n3c3kai1ad2i5l6u57ot14uorq.apps.googleusercontent.com",
  offlineAccess: true,
})

const rootGraphqlStore = RootGraphqlStore.create(undefined, {
  gqlHttpClient: createHttpClient("http://localhost:5000/graphql")
})

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
      await initFonts() // expo
      setupRootStore().then((newRootStore) => {
        newRootStore.userStore?.updateUser(auth().currentUser)
        setRootStore(newRootStore)
      })
    })()
  }, [])

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userState) => {
      rootStore?.userStore?.updateUser(userState) // Need to synchronise this with async setupRootStore
    })

    return () => unsubscribe()
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
        <StoreContext.Provider value={rootGraphqlStore}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </SafeAreaProvider>
        </StoreContext.Provider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
})

export default App
