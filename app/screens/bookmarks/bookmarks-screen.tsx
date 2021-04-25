import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { color } from "theme"
import { Screen } from "../../components/screen/screen"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const BookmarksScreen = observer(function BookmarksScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
    </Screen>
  )
})
