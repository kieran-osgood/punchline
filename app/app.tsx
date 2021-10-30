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
import { RootStore, RootStoreProvider, setupRootStore } from "app/models"
import { AutoHeightImage, GradientButton, Screen } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import RNRestart from "react-native-restart"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { ConnectionStatusBar, Text, View } from "react-native-ui-lib"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import "./i18n"
import {
  canExit,
  RootNavigator,
  RootStackParamList,
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
  const [initialized, setInitialized] = React.useState(false)
  const [rootStore, setRootStore] = React.useState<RootStore>()
  const [, setConnected] = React.useState({ isConnected: false })
  const firstRender = React.useRef(true)
  const navigationRef = useNavigationContainerRef<RootStackParamList>()

  useFlipper(navigationRef)
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  React.useEffect(() => {
    // Kick off initial async loading actions, like RootStore
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
        setInitialized(true)
      })
    }
  }, [])

  // Wait for state to load from AsyncStorage
  if (!rootStore || !initialized) return null

  return (
    <ToggleStorybook>
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        <RootStoreProvider value={rootStore}>
          <GraphQLStoreContext.Provider value={rootStore.apiStore.api}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <ConnectionStatusBar
                useAbsolutePosition
                onConnectionChange={(isConnected) => setConnected({ isConnected })}
              />
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </SafeAreaProvider>
          </GraphQLStoreContext.Provider>
        </RootStoreProvider>
      </Sentry.ErrorBoundary>
    </ToggleStorybook>
  )
})

export default App

const ErrorFallback: FallbackRender = ({ resetError }) => {
  const onPress = () => {
    RNRestart.Restart()
    resetError()
  }

  return (
    <Screen preset="fixed">
      <View flex-1 center>
        <View flex-1 center width={widthPercentageToDP("90%")}>
          <AutoHeightImage
            source={require("assets/images/look-for-errors.png")}
            containerStyle={CONTAINER_STYLE}
          />
          <Text text30BO>{"Not all Punchlines are created equally!"}</Text>
          <Text marginT-s3>
            {"Looks like Kieran has some work to do!\n"}
            {"This has been logged and we'll get it fixed soon."}
          </Text>
          <GradientButton label="Restart" marginT-s3 {...{ onPress }} />
        </View>
      </View>
    </Screen>
  )
}

const CONTAINER_STYLE: ViewStyle = {
  alignSelf: "flex-end",
}
