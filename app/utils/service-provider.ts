import { RootStoreType } from './../graphql/RootStore'
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import * as Sentry from "@sentry/react-native"
import admob, { MaxAdContentRating } from "@react-native-firebase/admob"
import { GoogleSignin } from "@react-native-community/google-signin"
import { RootStore as RootGraphqlStore } from "app/graphql/RootStore"
import { createHttpClient } from "mst-gql"

const packageJson = require("package.json")

export default class ServiceProvider {
  RootGraphqlStore: RootStoreType

  constructor() {
    this.initialiseVoidServices()
    this.RootGraphqlStore = RootGraphqlStore.create(undefined, {
      gqlHttpClient: createHttpClient("http://localhost:5000/graphql"),
    })
  }

  initialiseVoidServices() {
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
}
