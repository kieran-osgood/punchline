import { OnboardingModel } from "./onboarding"

test("can be created", () => {
  const instance = OnboardingModel.create({})

  expect(instance).toBeTruthy()
})
