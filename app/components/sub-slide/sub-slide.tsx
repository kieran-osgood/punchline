import { GradientButton } from "components"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button, Text, ThemeManager, View } from "react-native-ui-lib"
import { color } from "theme"

export interface SubSlideProps {
  /**
   * An optional style override useful for padding & margin.
   */
  subtitle: string
  description: string
  last?: boolean
  onPress: () => void
}

/**
 * Describe your component here
 */
export const SubSlide = observer(function SubSlide(props: SubSlideProps) {
  const { subtitle, description, last, onPress } = props

  return (
    <View center padding-s9 flex-1>
      <Text text50 marginB-s3 center>
        {subtitle}
      </Text>
      <Text marginB-s8 center>
        {description}
      </Text>
      {last ? (
        <GradientButton label="Let's get started" {...{ onPress }} />
      ) : (
        <Button
          label={"Next"}
          backgroundColor={color.line}
          color={color.text}
          labelStyle={{ color: ThemeManager.titleColor }}
          {...{ onPress }}
        />
      )}
    </View>
  )
})
