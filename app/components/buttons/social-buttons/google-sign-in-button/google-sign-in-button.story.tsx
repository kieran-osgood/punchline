import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../../storybook/views"
import { color } from "../../../../theme"
import { GoogleSignInButton } from "./google-sign-in-button"

storiesOf("GoogleSigninButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <GoogleSignInButton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
