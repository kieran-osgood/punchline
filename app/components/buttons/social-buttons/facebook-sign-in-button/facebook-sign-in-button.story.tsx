import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../../storybook/views"
import { color } from "../../../../theme"
import { FacebookSignInButton } from "./facebook-sign-in-button"

storiesOf("FacebookSigninButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FacebookSignInButton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))