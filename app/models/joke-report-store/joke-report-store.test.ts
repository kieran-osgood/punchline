import { JokeReportStoreModel } from "./joke-report-store"

test("can be created", () => {
  const instance = JokeReportStoreModel.create({})

  expect(instance).toBeTruthy()
})
