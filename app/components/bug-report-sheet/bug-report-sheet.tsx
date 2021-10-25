import { zodResolver } from "@hookform/resolvers/zod"
import * as Sentry from "@sentry/react-native"
import BottomSheetHoc, {
  BottomSheetImperativeHandle,
} from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { TextStyle, ViewStyle } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import { Button, Incubator, Text } from "react-native-ui-lib"
import { z } from "zod"

const schema = z.object({
  description: z.string(),
})
type Inputs = z.infer<typeof schema>

type ForwardBugReportSheetProps = {
  close?: () => void
}
/**
 * Describe your component here
 */
const ForwardBugReportSheet = (
  props: ForwardBugReportSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  const form = useForm<Inputs>({ resolver: zodResolver(schema) })
  const { handleSubmit, control } = form
  const { apiStore } = useStores()

  const submit = (data: Inputs) => {
    // Seemingly no longer available?
    // const lastEventId = Sentry.lastEventId()
    // If we can hook into the event listener maybe leave it in asyncstorage until we need it?
    // for now just post description to backend
    apiStore.api
      .mutateAddBugReport(
        {
          input: data,
        },
        (c) => c.bugReport((b) => b.id.description),
      )
      .then(
        () => {
          props.close?.()
        },
        (error) => {
          Sentry.captureException(error)
        },
      )
  }

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <Text text50 bold marginB-s3>
        Bug Report
      </Text>
      <Text marginB-s3>
        We'll try to collect information on the last crash. {"\n"}
        If you have any more details to provide of what occurred, and what was being used at the
        time, this will help us track down the issue.
      </Text>

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Incubator.TextField
            label="Description"
            onChangeText={onChange}
            marginT-s2
            keyboardShouldPersistTaps
            multiline
            numberOfLines={4}
            labelStyle={LABEL_STYLE}
            fieldStyle={FIELD_STYLE}
            maxLength={500}
            {...{ value, onBlur }}
          />
        )}
      />
      <Button label="Submit" onPress={handleSubmit(submit)} marginT-s3 />
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
const FIELD_STYLE: ViewStyle = {
  padding: 12,
  borderWidth: 1,
  borderColor: "hsl(30, 4.5%, 82.7%)",
  borderRadius: 4,
  minHeight: heightPercentageToDP("15%"),
  maxHeight: heightPercentageToDP("15%"),
  flexWrap: "wrap",
}
const LABEL_STYLE: TextStyle = {
  fontWeight: "500",
}
