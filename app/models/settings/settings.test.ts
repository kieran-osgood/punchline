import { createSettingsDefaultModel } from "./settings"

test("can be created", () => {
  const instance = createSettingsDefaultModel()

  expect(instance).toBeTruthy()
})
