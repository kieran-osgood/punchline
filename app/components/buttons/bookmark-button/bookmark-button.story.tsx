import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../../storybook/views"
import { color } from "../../../theme"
import { BookmarkButton } from "./bookmark-button"

storiesOf("BookmarkButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <BookmarkButton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
