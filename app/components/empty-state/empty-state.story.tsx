import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { EmptyState } from "./empty-state"

storiesOf("EmptyState", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <EmptyState onPress={() => console.log("onpress")} />
      </UseCase>
    </Story>
  ))
