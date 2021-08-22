import { CategorySetting } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"

type CategorySettingScreenProps = {}

export const CategorySettingScreen = observer(function CategorySettingScreen(
  props: CategorySettingScreenProps,
) {
  return (
    <>
      <CategorySetting />
    </>
  )
})

export default CategorySettingScreen
