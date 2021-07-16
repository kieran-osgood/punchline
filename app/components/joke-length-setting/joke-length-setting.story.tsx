import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { JokeLengthSetting } from "./joke-length-setting"

storiesOf("JokeLengthSetting", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <JokeLengthSetting style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
