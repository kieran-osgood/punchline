import BottomSheet, { BottomSheetView, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface ForwardBottomSheetHocProps {
  children: React.ReactNode
  initialSnapPoints?: Array<string | number>
  style?: ViewStyle | ViewStyle[]
  viewStyle?: ViewStyle | ViewStyle[]
}
export interface OptionsBottomSheet {
  open: () => void
}

/**
 * Provides default config/styling for the @gorhom/bottom-sheet library
 */
const ForwardBottomSheetHoc = (
  props: ForwardBottomSheetHocProps,
  imperativeRef: React.Ref<OptionsBottomSheet>,
) => {
  const insets = useSafeAreaInsets()
  const ref = React.useRef<BottomSheet>(null)
  const [index] = React.useState(-1)
  const initialSnapPoints = React.useMemo(() => {
    if (props.initialSnapPoints) return props.initialSnapPoints
    return ["CONTENT_HEIGHT"]
  }, [props.initialSnapPoints])

  const {
    animatedHandleHeight: handleHeight,
    animatedSnapPoints: snapPoints,
    animatedContentHeight: contentHeight,
    handleContentLayout: onLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  React.useImperativeHandle(imperativeRef, () => ({
    open: () => ref.current?.collapse(),
  }))

  return (
    <BottomSheet
      style={[BOTTOM_SHEET, props.style]}
      enablePanDownToClose
      {...{ ref, snapPoints, index, handleHeight, contentHeight }}
    >
      <BottomSheetView
        style={[{ paddingBottom: insets.bottom }, props.viewStyle]}
        {...{ onLayout }}
      >
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  )
}

export default observer(ForwardBottomSheetHoc, { forwardRef: true })

const BOTTOM_SHEET: ViewStyle = {
  shadowColor: "black",
  shadowOffset: {
    width: 0,
    height: -4,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
}
