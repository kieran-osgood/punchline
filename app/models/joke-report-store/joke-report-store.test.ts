import { JokeReportStoreModel } from "./joke-report-store"

test("can be created", () => {
  const instance = JokeReportStoreModel.create({})

  expect(instance).toBeTruthy()
})
// eslint-disable-next-line @typescript-eslint/no-empty-function
test("properly sends request for joke report", () => {})
