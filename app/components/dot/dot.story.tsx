import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { useSharedValue } from "react-native-reanimated"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Dot } from "./dot"

storiesOf("Dot", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => {
    const anim = useSharedValue<number>(1)
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <Dot index={1} currentIndex={anim} />
        </UseCase>
      </Story>
    )
  })
