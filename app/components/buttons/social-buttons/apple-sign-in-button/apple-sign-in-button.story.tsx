import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../../storybook/views"
import { color } from "../../../../theme"
import { AppleSignInButton } from "./apple-sign-in-button"

storiesOf("AppleSignInButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppleSignInButton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
