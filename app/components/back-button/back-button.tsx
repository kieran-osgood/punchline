import { BackArrowIcon } from "images"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Text, TouchableOpacity } from "react-native-ui-lib"

export interface BackButtonProps {
  reverse?: boolean
  onPress: () => void
}

/**
 * Describe your component here
 */
export const BackButton = observer(function BackButton(props: BackButtonProps) {
  const { reverse = false, onPress } = props

  return (
    <TouchableOpacity
      row
      style={BUTTON}
      marginR-s3={reverse}
      marginL-s3={!reverse}
      {...{ onPress }}
    >
      <BackText reverse={reverse} />
      <BackArrowIcon {...{ reverse }} />
      <BackText reverse={!reverse} />
    </TouchableOpacity>
  )
})

const BackText = ({ reverse }: { reverse: boolean }) => {
  if (!reverse) return null

  return (
    <Text marginR-s1={reverse} marginL-s1={reverse} text90R>
      Back
    </Text>
  )
}

const BUTTON: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}
