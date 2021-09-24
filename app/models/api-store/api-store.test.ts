import { ApiStoreModel } from "./api-store"

test("can be created", () => {
  const instance = ApiStoreModel.create({})

  expect(instance).toBeTruthy()
})
