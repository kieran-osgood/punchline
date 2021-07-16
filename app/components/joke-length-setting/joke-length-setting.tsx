import * as React from "react"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { CARD_SHADOW, Text, VerticalCheckboxes, VerticalCheckboxesProps } from "../"
import { JokeLength } from "app/graphql/JokeLengthEnum"
import { Skeleton } from "@motify/skeleton"
import { MotiTransitionProp, MotiView } from "moti"

const JokeLengths: JokeLength[] = Object.keys(JokeLength)
  .map((k) => JokeLength[k as keyof typeof JokeLength])
  .map((v) => v as JokeLength)
const CheckboxMap: VerticalCheckboxesProps["data"] = JokeLengths.map((x) => ({
  label: x.slice(0, 1) + x.slice(1).toLowerCase(),
  value: x,
}))

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface JokeLengthSettingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const JokeLengthSetting = observer(function JokeLengthSetting(
  props: JokeLengthSettingProps,
) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Text h2 bold text="Joke Length" style={TITLE} />
      <View style={ROW}>
        <JokePreview selected={3} />
        <VerticalCheckboxes data={CheckboxMap} style={{ width: "50%" }} onPress={() => {}} />
      </View>
    </View>
  )
})
const ROW: ViewStyle = {
  flexDirection: "row",
}
type JokePreviewProps = {
  selected: number
}

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

const transition: MotiTransitionProp = {}

export const JokePreview = (props: JokePreviewProps) => {
  const { selected } = props
  const [dark, toggle] = React.useReducer((s) => !s, false)

  const colorMode = dark ? "dark" : "light"

  return (
    <MotiView
      transition={{ type: "spring" }}
      style={[styles.container, styles.padded, PREVIEW, CARD_SHADOW]}
      animate={{ backgroundColor: dark ? "#000000" : "#fff" }}
    >
      <Skeleton
        transition={transition}
        // colors={['yellow', "pink", 'red']}
        colorMode={colorMode}
        height={25}
        width={"70%"}
      />
      <Spacer />
      {[...Array(selected).keys()].map((select) => (
        <React.Fragment key={select}>
          <Skeleton transition={transition} colorMode={colorMode} width={"100%"} height={10} />
          <Spacer height={3} />
          <Skeleton transition={transition} colorMode={colorMode} width={"100%"} height={10} />
          <Spacer height={6} />
        </React.Fragment>
      ))}
    </MotiView>
  )
}

const TITLE: TextStyle = {
  marginBottom: spacing[2],
}
const PREVIEW: ViewStyle = {
  borderWidth: 1,
  borderRadius: spacing[4],
  width: "50%",
  minHeight: 150,
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: color.dim,
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
})
// const JokeLengthSetting = () => {
//   const [jokeLength, setJokeLength] = useSetting<JokeLengthSetting>(
//     LocalStorageKeys.jokeLength,
//     'short',
//   )

//   const checked = (thisLength: JokeLength, selectedLength: JokeLength | undefined): boolean => {
//     return (
//       JokeLengths.indexOf(thisLength) <= JokeLengths.indexOf(selectedLength ?? JokeLength.SMALL)
//     )
//   }

//   return (
//     <CenterView style={JOKE_LENGTH_CONTAINER}>
//       <Text h4 text="Joke Length" />
//       <View style={ROW}>
//         {JokeLengths.map((length) => (
//           <View key={length} style={CHECKBOX}>
//             <Text text={length.toLocaleUpperCase()} />
//             {/* <CheckBox
//             checked={checked(length, jokeLength)}
//             size={35}
//             onPress={() => setJokeLength(length)}
//             checkedColor={color.success}
//             uncheckedColor={color.primaryDarker}
//           /> */}
//           </View>
//         ))}
//       </View>
//     </CenterView>
//   )
// }

// const JOKE_LENGTH_CONTAINER: ViewStyle = {
//   ...SETTING_ROW,
//   flexDirection: "column",
//   alignItems: "flex-start",
// }

// const ROW: ViewStyle = {
//   flexDirection: "row",
//   paddingTop: spacing[2],
// }

// const CHECKBOX: ViewStyle = {
//   justifyContent: "center",
//   alignItems: "center",
//   width: "33%",
// }
