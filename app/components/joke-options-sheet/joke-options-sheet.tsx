import BottomSheetHoc, {
  OptionsBottomSheet,
} from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { useStores } from "app/models"
import { Divider } from "app/screens/settings/screens/main-settings"
import { ErrorReportIcon } from "assets/images/error-report"
import { ShareLink } from "components"
import { Share } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Text, View } from "react-native-ui-lib"

type ForwardJokeOptionsSheetProps = {
  openReportJoke?: () => void
  close?: () => void
}
const ForwardJokeOptionsSheet = (
  props: ForwardJokeOptionsSheetProps,
  ref: React.Ref<OptionsBottomSheet>,
) => {
  const { apiStore } = useStores()

  const callbackAndClose = (cb: () => void) => {
    cb()
    props.close?.()
    props.openReportJoke?.()
  }

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <ShareLink jokeId={apiStore.jokeApi.topOfDeckJoke.id}>
        <Divider row arrow>
          <View row centerV>
            <Share scale={1.1} />
            <Text marginL-s2>Share Joke</Text>
          </View>
        </Divider>
      </ShareLink>

      <Divider row arrow onPress={() => callbackAndClose(() => props.openReportJoke?.())}>
        <View row centerV>
          <ErrorReportIcon />
          <Text marginL-s2>Report Joke</Text>
        </View>
      </Divider>
    </BottomSheetHoc>
  )
}

export const JokeOptionsSheet = observer(ForwardJokeOptionsSheet, { forwardRef: true })

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
}
