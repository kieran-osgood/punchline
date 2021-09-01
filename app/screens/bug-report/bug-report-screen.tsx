/* eslint-disable camelcase */
import * as Sentry from "@sentry/react-native"
import { Screen } from "components"
import { observer } from "mobx-react-lite"
import React from "react"
import { SENTRY_ORGANIZATION_SLUG, SENTRY_PROJECT_SLUG } from "react-native-dotenv"
import { Text, View } from "react-native-ui-lib"

type UserFeedbackParams = {
  event_id: string
  name: string
  email: string
  comments: string
}
export const BugReportScreen = observer(function BugReportScreen() {
  const apiUrl = `https://sentry.io/api/0/projects/${SENTRY_ORGANIZATION_SLUG}/${SENTRY_PROJECT_SLUG}/user-feedback/`
  const onPress = () => {
    const lastEventId = Sentry.lastEventId()
    const params = {
      event_id: "",
      name: "John Smith",
      email: "johnsmith@example.com",
      comments: "This app sucks",
    }
    submitFeedback(params)
  }

  function submitFeedback(params: UserFeedbackParams) {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
  }

  return (
    <Screen preset="scroll">
      <View center>
        <Text text30BO>Bug Report</Text>
      </View>
    </Screen>
  )
})
