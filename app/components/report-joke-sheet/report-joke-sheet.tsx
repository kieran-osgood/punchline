import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { useStores } from "app/models"
import { Success } from "assets/images"
import { BottomSheetImperativeHandle } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Toast from "react-native-toast-message"
import { Button, Colors, Text, Incubator, View } from "react-native-ui-lib"

// TODO: convert over to zod
// import { z } from "zod"
// const schema = z.object({
//   description: z.string(),
// })
// type Inputs = z.infer<typeof schema>

type ForwardReportJokeSheetProps = {
  close?: () => void
  open?: () => void
}

const ForwardReportJokeSheet = (
  props: ForwardReportJokeSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  const { close } = props
  const [text, setText] = React.useState("")
  const {
    apiStore: { jokeApi, jokeReportApi },
  } = useStores()
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value === 0 ? "none" : "flex",
  }))

  const opacity1 = useSharedValue(0)
  const style2 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    display: opacity1.value === 0 ? "none" : "flex",
  }))

  const submit = () => {
    const onSuccess = () => {
      // setText("")
      opacity.value = withTiming(0, {}, (finished) => {
        if (finished) opacity1.value = 1
      })
    }

    const onError = () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "Having trouble connecting to server. Please send an email through the settings page if this persists.",
        position: "bottom",
      })
      // setText("")
    }

    jokeReportApi
      .sendJokeReport({ id: jokeApi.topOfDeckJoke.id, description: text })
      .then(onSuccess, onError)
  }

  const handleClose = () => {
    close?.()
    // After close animation, reset form state
    setTimeout(() => {
      setText("")
      opacity.value = 1
      opacity1.value = 0
    }, 500)
  }

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      {/* Initially displayed UI */}
      <Animated.View style={style}>
        <View>
          <Text text40BO>Report</Text>
          <Text
            marginT-s2
            text90L
            black
            highlightString={jokeApi.topOfDeckJoke.id}
            highlightStyle={{
              color: Colors.grey20,
            }}
          >
            Id: {jokeApi.topOfDeckJoke.id}
          </Text>
          <Text
            text90L
            black
            highlightString={
              jokeApi.topOfDeckJoke.title ?? "NEVER GONNA GIVE YOU UP NEVER GONNA LET YOU DOWN"
            }
            highlightStyle={{
              color: Colors.grey20,
            }}
          >
            Subject: {jokeApi.topOfDeckJoke.title}
          </Text>
        </View>

        <View marginT-s3>
          <Text text80 marginB-s3>
            Provide a description of what this report is regarding.
          </Text>
          <View style={TEXT_AREA_CONTAINER} paddingH-s2 marginB-s4 height={150}>
            <Incubator.TextField
              placeholder="Describe the issue"
              value={text}
              onChangeText={setText}
              numberOfLines={3}
              fieldStyle={TEXT_AREA_FIELD}
              hitSlop={{ bottom: 100 }}
              multiline
            />
          </View>
          <Text text90L marginB-s3>
            Please note details provided here will be reviewed by moderators, you will not be
            contacted of the result.
          </Text>

          <View row spread>
            <Button
              label="Cancel"
              onPress={() => close?.()}
              outline
              br10
              outlineColor="black"
              color="black"
              flex-1
            />
            <Button label="Submit" disabled={!text} onPress={submit} br10 flex-1 marginL-s1 />
          </View>
        </View>
      </Animated.View>

      {/* Only visible after submiting the form */}
      <ReportFormSubmitted style={style2} onClosePress={handleClose} />
    </BottomSheetHoc>
  )
}

export const ReportJokeSheet = observer(ForwardReportJokeSheet, {
  forwardRef: true,
})

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
}
const FORM_SUBMITTED: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
const FORM_SUBMITTED_CONTAINER: ViewStyle = {
  flex: 0.75,
}
const TEXT_AREA_CONTAINER: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.grey60,
}
const TEXT_AREA_FIELD: ViewStyle = {
  paddingHorizontal: 5,
  paddingVertical: 10,
}

const ReportFormSubmitted = (props: { style: ViewStyle; onClosePress: () => void }) => {
  return (
    <Animated.View style={[FORM_SUBMITTED, props.style]}>
      <View width="75%" centerH spread paddingT-s3 style={FORM_SUBMITTED_CONTAINER}>
        <Success width="40%" />
        <View center>
          <Text text50 bold marginT-s5>
            Report Received
          </Text>
          <Text marginT-s3>
            Thank you for reporting this, apologies for any inconvenience caused.
          </Text>
        </View>
      </View>
      <Button label="Close" onPress={() => props.onClosePress()} marginT-s5 />
    </Animated.View>
  )
}
