import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, CenterView, Header, JokeSection } from "components"
import { color } from "theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const JokeScreen = observer(function JokeScreen() {
  return (
    <Screen style={ROOT} preset="fixed" testID="JokeScreen">
      <CenterView>
        <JokeSection />
      </CenterView>
    </Screen>
  )
})
