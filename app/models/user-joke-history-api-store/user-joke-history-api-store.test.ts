import { UserJokeHistoryApiStoreModel } from "./user-joke-history-api-store"

test("can be created", () => {
  const instance = UserJokeHistoryApiStoreModel.create({})

  expect(instance).toBeTruthy()
})
