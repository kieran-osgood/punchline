import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { JokeLengthSetting } from "./joke-length-setting"

storiesOf("JokeLengthSetting", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <JokeLengthSetting />
      </UseCase>
    </Story>
  ))
