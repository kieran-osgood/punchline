import { Section } from "app/screens/settings/screens/main-settings"
import { CategorySetting, JokeLengthSetting, Screen } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native-ui-lib"

type JokePreferencesScreenProps = {}
export const JokePreferencesScreen = observer(function JokePreferencesScreen(
  props: JokePreferencesScreenProps,
) {
  return (
    <Screen preset="scroll" unsafe>
      <View paddingB-s5>
        {/* User the divider style in the main settings page
        make the title more prominent and reduce the current "filter out the story"
        and "select categories you dont wish" sentences to be low contrast subcopy
      */}
        <Section title="Joke Length">
          <JokeLengthSetting />
        </Section>

        <Section title="Categories Filter">
          <CategorySetting />
        </Section>
      </View>
    </Screen>
  )
})

export default JokePreferencesScreen
