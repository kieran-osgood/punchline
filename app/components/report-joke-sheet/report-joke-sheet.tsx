import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { OptionsBottomSheet } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Text } from "react-native-ui-lib"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardReportJokeSheetProps = {
  close?: () => void
  open?: () => void
}

/**
 * Describe your component here
 */
const ForwardReportJokeSheet = (
  props: ForwardReportJokeSheetProps,
  ref: React.Ref<OptionsBottomSheet>,
) => {
  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <Text>Awesome 🎉</Text>
    </BottomSheetHoc>
  )
}

export const ReportJokeSheet = observer(ForwardReportJokeSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
}
