import { storiesOf } from "@storybook/react-native"
import { JokeLength } from "app/graphql"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { VerticalCheckboxes } from "./vertical-checkboxes"

storiesOf("VerticalCheckboxes", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <VerticalCheckboxes
          data={[{ label: "Label", value: JokeLength.LARGE, isChecked: true }]}
          onPress={() => {
            console.log("pressed")
          }}
        />
      </UseCase>
    </Story>
  ))
