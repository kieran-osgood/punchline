import * as d from "detox"
// import * as adapter from "detox/runners/jest/adapter"
const adapter = require("detox/runners/jest/adapter")
const { execSync } = require("child_process")
const config = require("../package.json").detox

jest.setTimeout(120000)
jasmine.getEnv().addReporter(adapter)

beforeAll(async () => {
  execSync(`rm -rf $(pwd)/screenshots/*`)
  await d.init(config)
  // TODO: might need to manually start the metro bundler?
  await device.uninstallApp()
  await device.installApp()
  await d.device.launchApp({
    newInstance: true,
    permissions: {
      calendar: "YES",
      camera: "YES",
      contacts: "YES",
      health: "YES",
      homekit: "YES",
      location: "always",
      medialibrary: "YES",
      microphone: "YES",
      motion: "YES",
      notifications: "YES",
      photos: "YES",
      reminders: "YES",
      siri: "YES",
    },
  })
})

beforeEach(async () => {
  await adapter.beforeEach()
})

afterAll(async () => {
  await adapter.afterAll()
  await d.cleanup()
})
