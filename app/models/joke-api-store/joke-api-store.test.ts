import { JokeApiStoreModel } from "./joke-api-store"

describe("", () => {
  test("can be created", () => {
    const instance = JokeApiStoreModel.create({})

    expect(instance).toBeTruthy()
  })

  test("doesnt serialize deeplinkjoke", () => {})
  test("fetch new jokes when joke count gets below 10", () => {})
  test("returns a default empty joke if the list is empty", () => {})
  test("sets deep link joke if we have it, fetches if not", () => {})
  test("nonviewedjokes filters explicit jokes (if profancity filter is on)", () => {})
  test("nonviewedjokes filters viewed joke", () => {})
  test("nonviewedjokes filters categories joke", () => {})
  test("queryJokes variables properly adds settings ", () => {})
})
