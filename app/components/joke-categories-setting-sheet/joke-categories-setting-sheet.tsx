import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { BottomSheetImperativeHandle, CategorySetting } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardJokeCategoriesSettingSheetProps = {}

export interface JokeCategoriesSettingSheetProps {}

/**
 * Describe your component here
 */
const ForwardJokeCategoriesSettingSheet = (
  props: ForwardJokeCategoriesSettingSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  return (
    <BottomSheetHoc
      ref={ref}
      container="scroll"
      containerStyle={BOTTOM_SHEET_VIEW}
      initialSnapPoints={["80%"]}
    >
      <CategorySetting />
    </BottomSheetHoc>
  )
}

export const JokeCategoriesSettingSheet = observer(ForwardJokeCategoriesSettingSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
}
