import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { BottomSheetImperativeHandle, JokeLengthSetting } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardJokeLengthSettingSheetProps = {}

export interface JokeLengthSettingSheetProps {}

/**
 * Describe your component here
 */
const ForwardJokeLengthSettingSheet = (
  props: ForwardJokeLengthSettingSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <JokeLengthSetting />
    </BottomSheetHoc>
  )
}

export const JokeLengthSettingSheet = observer(ForwardJokeLengthSettingSheet, { forwardRef: true })

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
  paddingVertical: 20,
}
