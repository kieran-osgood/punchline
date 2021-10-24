import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { DeepLinkJokeSheet } from "./deep-link-joke-sheet"

storiesOf("DeepLinkJokeSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DeepLinkJokeSheet />
      </UseCase>
    </Story>
  ))
