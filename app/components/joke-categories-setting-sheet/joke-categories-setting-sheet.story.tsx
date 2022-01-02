import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { JokeCategoriesSettingSheet } from "./joke-categories-setting-sheet"

storiesOf("JokeCategoriesSettingSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <JokeCategoriesSettingSheet />
      </UseCase>
    </Story>
  ))
