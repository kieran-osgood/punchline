import { CategorySetting, Screen } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native-ui-lib"

type CategorySettingScreenProps = {}

export const CategorySettingScreen = observer(function CategorySettingScreen(
  props: CategorySettingScreenProps,
) {
  return (
    <Screen preset="scroll" backgroundColor="white" unsafe>
      <View paddingH-s5>
        <CategorySetting />
      </View>
    </Screen>
  )
})

export default CategorySettingScreen
