import { createSettingsDefaultModel } from "app/models/settings/settings"

describe("", () => {
  test("can be created", () => {
    const instance = createSettingsDefaultModel()
    const settings = instance.create()
    expect(settings).toBeTruthy()
  })
  test("", () => {
    const instance = createSettingsDefaultModel()
    const settings = instance.create()
    expect(settings.jokeLengthMax).toEqual(1)
    // use this to mock out the requests and get some integration tests in the models
    // https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/tests/lib/todos/todostore.test.js#L18-L110
  })
  // test("setProfanityFilter and setNotification properly toggle state", () => {})
  // test("blocked category ids filters by isFiltered", () => {})
  // test("jokeLengthMax is calculated properly", () => {})
  // test("jokeLengthMaxEnum returns same as jokeLengthMax in array", () => {})
  // test("checkBoxMap maps preferences and defaults to 0 if nonthing selected", () => {})
  // test("anySelected calculated properly", () => {})
  // test("toggleJokeLength sets values", () => {})
  // test("toggleJokeLength shows toast on error", () => {})
  // test("unselectAllBlockedCategories unselects everything", () => {})
})
