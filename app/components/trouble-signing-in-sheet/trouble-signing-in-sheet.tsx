import { zodResolver } from "@hookform/resolvers/zod"
import auth from "@react-native-firebase/auth"
import BottomSheetHoc from "app/components/bottom-sheet-hoc/bottom-sheet-hoc"
import { ErrorCallback } from "app/screens"
import { BottomSheetImperativeHandle } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { TextStyle, ViewStyle } from "react-native"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { API_URL } from "react-native-dotenv"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { Button, Incubator, Text } from "react-native-ui-lib"
import { z } from "zod"

const appJson = require("app.json")

const schema = z.object({
  email: z.string().email(),
})
type Inputs = z.infer<typeof schema>

type ForwardTroubleSigningInSheetProps = { onError: ErrorCallback }

export interface TroubleSigningInSheetProps {}

/**
 * Describe your component here
 */
const ForwardTroubleSigningInSheet = (
  { onError }: ForwardTroubleSigningInSheetProps,
  ref: React.Ref<BottomSheetImperativeHandle>,
) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "all",
  })
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = form

  const handleTroubleLoggingIn = async (data: Inputs) => {
    try {
      await auth().sendSignInLinkToEmail(data.email, {
        handleCodeInApp: true,
        url: `${API_URL}/login?email=${data.email}`,
        iOS: {
          bundleId: appJson.expo.ios.bundleIdentifier,
        },
        android: {
          packageName: appJson.expo.android.package,
          installApp: true,
          minimumVersion: "12",
        },
      })
    } catch (error) {
      if (error instanceof Error) onError(error)
    }
  }

  return (
    <BottomSheetHoc ref={ref} containerStyle={BOTTOM_SHEET_VIEW}>
      <Text text50 marginB-s3 bold>
        Request Login
      </Text>
      <Text marginB-s3>
        If you previously signed in/link a social media provider, we'll send a login link to that
        email address.
      </Text>

      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Incubator.TextField
            label="Email Address"
            onChangeText={onChange}
            keyboardType="email-address"
            textContentType="emailAddress"
            spellCheck={false}
            autoCorrect={false}
            marginT-s2
            enableErrors
            validationMessage={errors.email?.message}
            keyboardShouldPersistTaps
            labelStyle={LABEL_STYLE}
            fieldStyle={FIELD_STYLE}
            validationMessageStyle={VALIDATION_MESSAGE_STYLE}
            {...{ value, onBlur }}
          />
        )}
      />
      <Button
        label="Submit"
        disabled={!isDirty || !!errors.email}
        onPress={handleSubmit(handleTroubleLoggingIn)}
        marginT-s3
      />
    </BottomSheetHoc>
  )
}

export const TroubleSigningInSheet = observer(ForwardTroubleSigningInSheet, { forwardRef: true })

const BOTTOM_SHEET_VIEW: ViewStyle = {
  paddingHorizontal: widthPercentageToDP("5%"),
  paddingVertical: 20,
}
const FIELD_STYLE: ViewStyle = {
  padding: 12,
  borderWidth: 1,
  borderColor: "hsl(30, 4.5%, 82.7%)",
  borderRadius: 4,
}
const LABEL_STYLE: TextStyle = {
  fontWeight: "500",
}
const VALIDATION_MESSAGE_STYLE: TextStyle = {
  paddingTop: 4,
}
