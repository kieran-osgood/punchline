import { ParamListBase, useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Header } from "./header"

storiesOf("Header", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => {
    const navigation: StackNavigationProp<ParamListBase> = useNavigation()

    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <Header
            navigation={navigation}
            layout={{} as any}
            options={{} as any}
            route={{} as any}
            styleInterpolator={{} as any}
            progress={{} as any}
          />
        </UseCase>
      </Story>
    )
  })
