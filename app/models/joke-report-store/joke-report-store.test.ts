import { JokeReportStoreModel } from "./joke-report-store"

test("can be created", () => {
  const instance = JokeReportStoreModel.create({})

  expect(instance).toBeTruthy()
})
test("properly sends request for joke report", () => {})
