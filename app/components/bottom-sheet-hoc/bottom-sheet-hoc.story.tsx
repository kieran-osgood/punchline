import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import BottomSheetHoc from "./bottom-sheet-hoc"

storiesOf("BottomSheetHoc", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <BottomSheetHoc>
          <></>
        </BottomSheetHoc>
      </UseCase>
    </Story>
  ))
