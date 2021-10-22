/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/display-name */
import * as Sentry from "@sentry/react-native"
import { useStores } from "app/models"
import * as React from "react"
import InAppReview from "react-native-in-app-review"

const withRateApp = <T extends object>(Component: React.ComponentType<T>) => (props: T) => {
  const stores = useStores()
  React.useEffect(() => {
    let isSubscribed = true

    // This package is only available on android version >= 21 and iOS >= 10.3
    // Give you result if version of device supported to rate app or not!
    const available = InAppReview.isAvailable()
    if (!available) return
    if (stores.userStore.goodJokeCount < 30) return
    // if (differenceInCalendarDays(stores.userStore.lastDisplayedReviewPrompt, new Date()) > 15) {
    //   return
    // }

    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
      .then((_hasFlowFinishedSuccessfully) => {
        if (!isSubscribed) return

        stores.userStore.setLastDisplayedReviewPrompt()
        stores.userStore.resetGoodJokecount()
        // when return true in android it means user finished or close review flow
        // console.log("InAppReview in android", hasFlowFinishedSuccessfully)

        // when return true in ios it means review flow lanuched to user.
        // console.log("InAppReview in ios has launched successfully", hasFlowFinishedSuccessfully)

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        // if (hasFlowFinishedSuccessfully) {
        // do something for ios
        // do something for android
        // }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch((error) => {
        // we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        if (isSubscribed) Sentry.captureException(error)
      })

    return () => {
      isSubscribed = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores.userStore.goodJokeCount, stores.userStore.lastDisplayedReviewPrompt])

  return <Component {...(props as T)} />
}

export default withRateApp
