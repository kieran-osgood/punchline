import { getStorybookUI } from "@storybook/react-native"
import { isDevelopment } from "app/utils/current-environment"
import React, { useEffect, useState } from "react"
import { DevSettings } from "react-native"
import { loadString, saveString } from "../app/utils/storage"

/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-isDevelopment mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 * The mode flag is persisted in async storage, which means it
 * persists across reloads/restarts - this is handy when developing
 * new components in Storybook.
 */
export function ToggleStorybook(props: { children: any }) {
  const [showStorybook, setShowStorybook] = useState(false)
  const [StorybookUIRoot, setStorybookUIRoot] = useState<ReturnType<typeof getStorybookUI> | null>(
    null,
  )

  useEffect(() => {
    if (isDevelopment) {
      // Load the setting from storage if it's there
      loadString("devStorybook").then((storedSetting) => {
        // Set the initial value
        setShowStorybook(storedSetting === "on")

        // Add our toggle command to the menu
        DevSettings.addMenuItem("Toggle Storybook", () => {
          setShowStorybook((show) => {
            // On toggle, flip the current value
            show = !show

            // Write it back to storage
            saveString("devStorybook", show ? "on" : "off")

            // Return it to change the local state
            return show
          })
        })

        // Load the storybook UI once
        setStorybookUIRoot(() => require("./storybook").StorybookUIRoot)
      })
    }
  }, [showStorybook])

  if (showStorybook) {
    return StorybookUIRoot ? <StorybookUIRoot /> : null
  } else {
    return props.children
  }
}
