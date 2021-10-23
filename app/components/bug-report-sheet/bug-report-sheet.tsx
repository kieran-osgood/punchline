import BottomSheetHoc, {
  OptionsBottomSheet,
} from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Text } from "react-native-ui-lib"

// eslint-disable-next-line @typescript-eslint/ban-types
type ForwardBugReportSheetProps = {}

export interface BugReportSheetProps {}

/**
 * Describe your component here
 */
const ForwardBugReportSheet = (
  props: ForwardBugReportSheetProps,
  ref: React.Ref<OptionsBottomSheet>,
) => {
  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <Text>hello</Text>
    </BottomSheetHoc>
  )
}

export const BugReportSheet = observer(ForwardBugReportSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
  paddingVertical: 20,
}
