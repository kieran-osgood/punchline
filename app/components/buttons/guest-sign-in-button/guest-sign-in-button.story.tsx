import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../storybook/views"
import { color } from "../../../theme"
import { GuestSignInButton } from "./guest-sign-in-button"

storiesOf("GuestSignInButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <GuestSignInButton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
