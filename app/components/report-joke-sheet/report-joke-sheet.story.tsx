import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { ReportJokeSheet } from "./report-joke-sheet"

storiesOf("ReportJokeSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ReportJokeSheet />
      </UseCase>
    </Story>
  ))
