import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../storybook/views"
import { color } from "../../../theme"
import { JokeSection } from "./joke-section"

storiesOf("JokeSection", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <JokeSection style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
