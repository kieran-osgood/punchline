import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { SubSlide } from "./sub-slide"

storiesOf("SubSlide", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SubSlide
          description=""
          subtitle=""
          onPress={() => {
            console.log("press!")
          }}
        />
      </UseCase>
    </Story>
  ))
