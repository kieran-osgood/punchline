import { JokeLengthSetting, Screen } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"

type JokeLengthScreenProps = {}
export const JokeLengthScreen = observer(function JokeLengthScreen(props: JokeLengthScreenProps) {
  return (
    <Screen backgroundColor="white" unsafe>
      <JokeLengthSetting />
    </Screen>
  )
})

export default JokeLengthScreen
