/* eslint-disable @typescript-eslint/no-empty-function */
import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { SelectPills } from "./select-pills"

storiesOf("SelectPills", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SelectPills data={[]} onValueChange={() => {}} />
      </UseCase>
    </Story>
  ))
