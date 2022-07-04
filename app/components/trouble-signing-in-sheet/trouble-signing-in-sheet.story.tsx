import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { TroubleSigningInSheet } from "./trouble-signing-in-sheet"

storiesOf("TroubleSigningInSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TroubleSigningInSheet onError={() => console.log("onError!")} />
      </UseCase>
    </Story>
  ))
