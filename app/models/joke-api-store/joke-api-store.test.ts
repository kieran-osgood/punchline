import { JokeApiStoreModel } from "./joke-api-store"

test("can be created", () => {
  const instance = JokeApiStoreModel.create({})

  expect(instance).toBeTruthy()
})
