import { createSettingsDefaultModel } from "app/models/settings/settings"

test("can be created", () => {
  const instance = createSettingsDefaultModel()
  const settings = instance.create()
  expect(settings).toBeTruthy()
})
