import { configure, getStorybookUI } from "@storybook/react-native"
import React, { useEffect } from "react"
import { initFonts } from "../app/theme/fonts"

declare let module: any

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TEST = __TEST__

configure(() => {
  require("./storybook-registry")
}, module)

const StorybookUI = getStorybookUI({
  port: 9001,
  host: "localhost",
  onDeviceUI: true,
  asyncStorage: require("@react-native-async-storage/async-storage").default || null,
})

export function StorybookUIRoot() {
  useEffect(() => {
    (async () => {
      await initFonts() // expo only
      if (typeof TEST === "undefined" || !TEST) {
        const Reactotron = require("../app/services/reactotron")
        const reactotron = new Reactotron.Reactotron()
        reactotron.setup()
      }
    })()
  }, [])

  return <StorybookUI />
}
