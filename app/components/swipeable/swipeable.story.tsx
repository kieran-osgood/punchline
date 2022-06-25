import { storiesOf } from "@storybook/react-native"
import { JokeModel } from "app/graphql"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import Swipeable from "./swipeable"

storiesOf("Swipeable", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Swipeable isLoading onTop joke={JokeModel.create()} />
      </UseCase>
    </Story>
  ))
