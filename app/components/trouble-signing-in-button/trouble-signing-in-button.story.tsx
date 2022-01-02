import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { TroubleSigningInButton } from "./trouble-signing-in-button"

storiesOf("TroubleSigningInButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TroubleSigningInButton />
      </UseCase>
    </Story>
  ))
