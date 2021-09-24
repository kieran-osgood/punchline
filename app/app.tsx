/**
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import auth from "@react-native-firebase/auth"
import { useFlipper } from "@react-navigation/devtools"
import { useNavigationContainerRef } from "@react-navigation/native"
import * as Sentry from "@sentry/react-native"
import { FallbackRender } from "@sentry/react/dist/errorboundary"
import { StoreContext as GraphQLStoreContext } from "app/graphql/reactUtils"
import { RootStore, RootStoreProvider, setupRootStore, useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { widthPercentageToDP } from "react-native-responsive-screen"
import RNRestart from "react-native-restart"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Button, ConnectionStatusBar, Text, View } from "react-native-ui-lib"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import "./i18n"
import {
  canExit,
  RootNavigator,
  RootParamList,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "./navigators"
import "./utils/ignore-warnings"
import * as storage from "./utils/storage"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App = observer(function App() {
  const navigationRef = useNavigationContainerRef<RootParamList>()
  useFlipper(navigationRef)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const firstRender = React.useRef(true)
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )
  const [initted, setInnited] = useState(false)
  // Kick off initial async loading actions, like RootStore
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      const init = async () => {
        setupRootStore().then((newRootStore) => {
          newRootStore.userStore.updateUser(auth().currentUser)
          setRootStore(newRootStore)
        })
      }

      init().finally(() => {
        // RNBootSplash.hide({ fade: true })
        setInnited(true)
      })
    }
  }, [])

  // Wait for state to load from AsyncStorage
  if (!rootStore || !initted) return null

  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <GraphQLStoreContext.Provider value={rootStore.apiStore.api}>
          <Authorization>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <ConnectionStatusBar
              // onConnectionChange={(isConnected) => setConnected({ isConnected })}
              />
              <Sentry.ErrorBoundary
                fallback={ErrorFallback}
                // beforeCapture={(scope) => {
                //   scope.setTag("location", "app.tsx")
                // }}
              >
                <RootNavigator
                  ref={navigationRef}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </Sentry.ErrorBoundary>
            </SafeAreaProvider>
          </Authorization>
        </GraphQLStoreContext.Provider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
})

export default App

const Authorization = observer(function Authorization({ children }: { children: React.ReactNode }) {
  const { userStore } = useStores()

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      userStore.login(user)
    })

    return () => unsubscribe()
  }, [userStore])

  return <>{children}</>
})

const ErrorFallback: FallbackRender = ({ resetError }) => {
  const onPress = () => {
    RNRestart.Restart()
    resetError()
  }

  return (
    <View flex-1 center>
      <View center width={widthPercentageToDP("70%")}>
        <Text text20BO>{"Oops"}</Text>
        <Text center marginT-s3>
          {"Looks like that punchline flopped!\n"}
          {"We've logged this to our team, so please try again.\n\n"}
        </Text>
        <Button label="Restart" marginT-s3 {...{ onPress }} />
      </View>
    </View>
  )
}
