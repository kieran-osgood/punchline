import { Skeleton } from "@motify/skeleton"
import { JokeLength } from "app/graphql/JokeLengthEnum"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { MotiTransitionProp, MotiView } from "moti"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Text, View } from "react-native-ui-lib"
import { CARD_SHADOW, VerticalCheckboxes } from "../"
import { color, spacing } from "../../theme"

export const JokeLengths: JokeLength[] = Object.keys(JokeLength)
  .map((k) => JokeLength[k as keyof typeof JokeLength])
  .map((v) => v as JokeLength)

export interface JokeLengthSettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Allows the user to select from the range of the allowed joke lengths from the graphql api
 */
export const JokeLengthSetting = observer(function JokeLengthSetting(
  props: JokeLengthSettingProps,
) {
  const { style } = props
  const { settings } = useStores()

  return (
    <View {...{ style }} paddingV-s4>
      <View marginB-s4>
        <Text>
          Filter out the story jokes and keep it to one liners, or mix it up with a bit of both!
        </Text>
      </View>
      <View row paddingH-s5>
        <JokePreview selected={settings.jokeLengthMax} />
        <VerticalCheckboxes
          data={settings.checkboxMap}
          style={VERTICAL_BOXES}
          onPress={(value, isChecked) => settings.toggleJokeLength(value, isChecked)}
        />
      </View>
    </View>
  )
})

const VERTICAL_BOXES: ViewStyle = {
  width: "50%",
}

const transition: MotiTransitionProp = {}
const colorMode = "light"
type JokePreviewProps = {
  selected: number
}
export const JokePreview = (props: JokePreviewProps) => {
  const { selected } = props

  const colors = [color.primary, "#6570DC", color.primary]
  return (
    <MotiView
      transition={{ type: "timing" }}
      style={[PREVIEW, CARD_SHADOW]}
      animate={{ backgroundColor: "#fff" }}
    >
      <Skeleton {...{ colors, colorMode, transition }} height={20} width={"70%"} />
      <Spacer />
      {[...Array(selected).keys()].map((select) => (
        <React.Fragment key={select}>
          <Skeleton {...{ colors, colorMode, transition }} width={"100%"} height={10} />
          <Spacer height={3} />
          <Skeleton {...{ colors, colorMode, transition }} width={"100%"} height={10} />
          <Spacer height={6} />
        </React.Fragment>
      ))}
    </MotiView>
  )
}

const PREVIEW: ViewStyle = {
  borderWidth: 1,
  borderRadius: spacing[4],
  width: "50%",
  minHeight: 165,
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: color.dim,
  flex: 1,
  padding: 16,
}

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
