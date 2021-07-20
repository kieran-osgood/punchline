import { GoogleSignin } from "@react-native-community/google-signin"
import admob, { MaxAdContentRating } from "@react-native-firebase/admob"
import * as Sentry from "@sentry/react-native"
import { onSnapshot } from "mobx-state-tree"
import { enableScreens } from "react-native-screens"
import * as storage from "../../utils/storage"
import { Environment } from "../environment"
import { RootStore, RootStoreModel } from "./root-store"

const packageJson = require("package.json")

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  initialiseVoidServices()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}

function initialiseVoidServices() {
  enableScreens()

  admob().setRequestConfiguration({
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

  Sentry.init({
    dsn: "https://14d48ec94bab4f1fa583a3b6ab7f7a3b@o577022.ingest.sentry.io/5731300",
    release: "com.ko.punchline@" + packageJson.version,
    environment: process.env.NODE_ENV,
    attachStacktrace: true,
    autoSessionTracking: true,
    enabled: !__DEV__,
  })
}
