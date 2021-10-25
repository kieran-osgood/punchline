import BottomSheetHoc, {
  BottomSheetImperativeHandle,
} from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { useStores } from "app/models"
import { Divider } from "app/screens/settings/screens/main-settings"
import { ErrorReportIcon } from "assets/images/error-report"
import { Share as ShareIcon } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { API_URL } from "react-native-dotenv"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Share from "react-native-share"
import { Text, View } from "react-native-ui-lib"

type ForwardJokeOptionsSheetProps = {
  openReportJoke?: () => void
  close?: () => void
}
const ForwardJokeOptionsSheet = (
  props: ForwardJokeOptionsSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
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
            <ShareIcon scale={1.1} />
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
type LinkProps = {
  jokeId: string
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  type?: Type
}

type Type = "facebook" | "twitter" | "default"

export const ShareLink = ({ jokeId, children, style = {}, type = "default" }: LinkProps) => {
  const onPress = async () => {
    try {
      await Share.open({
        title: "",
        url: `${API_URL}/share/joke?id=${jokeId}`,
      })
    } catch (error) {
      // This is caught but not logged due to: https://github.com/react-native-share/react-native-share/issues/1112
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  )
}
