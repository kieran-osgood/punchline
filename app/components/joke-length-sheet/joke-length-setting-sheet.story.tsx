import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { JokeLengthSettingSheet } from "./joke-length-setting-sheet"

storiesOf("JokeLengthSettingSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <JokeLengthSettingSheet />
      </UseCase>
    </Story>
  ))
