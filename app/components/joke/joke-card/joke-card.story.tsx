import { storiesOf } from "@storybook/react-native"
import { JokeModel } from "app/graphql"
import * as React from "react"
import { useSharedValue } from "react-native-reanimated"
import { Story, StoryScreen, UseCase } from "../../../../storybook/views"
import JokeCard from "./joke-card"

storiesOf("Profile", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => {
    const anim = useSharedValue(0)
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <JokeCard
            joke={JokeModel.create()}
            onTop
            scale={anim}
            translateX={anim}
            translateY={anim}
          />
        </UseCase>
      </Story>
    )
  })
