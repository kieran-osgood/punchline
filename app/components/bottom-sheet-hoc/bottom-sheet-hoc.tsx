import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface ForwardBottomSheetHocProps {
  children: React.ReactNode
  initialSnapPoints?: Array<string | number>
  style?: ViewStyle | ViewStyle[]
  containerStyle?: ViewStyle | ViewStyle[]
  container?: "view" | "scroll"
}
export interface OptionsBottomSheet {
  open: () => void
  close: () => void
}

/**
 * Provides default config/styling for the @gorhom/bottom-sheet library
 */
const ForwardBottomSheetHoc = (
  props: ForwardBottomSheetHocProps,
  imperativeRef: React.Ref<OptionsBottomSheet>,
) => {
  const {
    container = "view",
    children,
    style,
    initialSnapPoints: _initialSnapPoints,
    containerStyle: _containerStyle,
  } = props
  const insets = useSafeAreaInsets()
  const ref = React.useRef<BottomSheet>(null)
  const [index] = React.useState(-1)

  const initialSnapPoints = React.useMemo(() => {
    if (container === "scroll" && !_initialSnapPoints) {
      throw Error(
        "Dynamic content height does not work with scroll type! https://github.com/gorhom/react-native-bottom-sheet/issues/658",
      )
    }
    if (_initialSnapPoints) return _initialSnapPoints
    return ["CONTENT_HEIGHT"]
  }, [container, _initialSnapPoints])

  const {
    animatedHandleHeight: handleHeight,
    animatedSnapPoints: snapPoints,
    animatedContentHeight: contentHeight,
    handleContentLayout: onLayout,
    // Animated snappoints doesn't work with scroll views
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  React.useImperativeHandle(imperativeRef, () => ({
    open: () => ref.current?.collapse(),
    close: () => ref.current?.close(),
  }))

  const bottomSheetProps =
    container === "view"
      ? { handleHeight, snapPoints, contentHeight }
      : { snapPoints: _initialSnapPoints ?? ["50%"] }

  const containerStyle = [
    { paddingBottom: insets.bottom !== 0 ? insets.bottom : 20 },
    _containerStyle,
  ]

  return (
    <BottomSheet
      style={[BOTTOM_SHEET, style]}
      enablePanDownToClose
      {...{ ref, index }}
      {...bottomSheetProps}
    >
      {container === "scroll" && (
        <BottomSheetScrollView style={containerStyle}>{children}</BottomSheetScrollView>
      )}
      {container === "view" && (
        <BottomSheetView style={containerStyle} {...{ onLayout }}>
          {children}
        </BottomSheetView>
      )}
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
