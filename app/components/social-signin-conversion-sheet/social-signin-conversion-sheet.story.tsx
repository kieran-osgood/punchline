import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { SocialSigninConversionSheet } from "./social-signin-conversion-sheet"

storiesOf("SocialSigninConversionSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SocialSigninConversionSheet />
      </UseCase>
    </Story>
  ))
