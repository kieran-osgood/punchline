import { CategoryModel, JokeLength } from "app/graphql"
import { createSettingsDefaultModel } from "app/models"
import { SnapshotOut } from "mobx-state-tree"
import {
  createMockedRootStore,
  createMockedRootStoreWithApi,
  failIfFalsy,
} from "test/utils/components"
import MockGraphQLClient from "test/__mocks__/mock-graphql-client"

const categories = {
  1: {
    id: "1",
    __typename: "Category",
    isFiltered: false,
    image: "",
    name: "",
  },
  2: {
    id: "2",
    __typename: "Category",
    isFiltered: false,
    image: "",
    name: "",
  },
} as const

test.only("iTEST", async () => {
  const { apiStore } = createMockedRootStoreWithApi(undefined, new MockGraphQLClient([]))
  // apiStore.api.setBearerToken("abc")
  try {
    const { jokes: connection } = await apiStore.api.getQueryJokes()
    console.log("connection: ", connection)
  } catch (err) {
    console.log("err:", err)
  }
})

describe("settings model", () => {
  test("can be created", () => {
    const instance = createSettingsDefaultModel()
    const settings = instance.create()
    expect(settings).toBeTruthy()
  })

  test(".jokeLengthMax default to 3 and changes correctly", () => {
    const { settings } = createMockedRootStore()
    expect(settings.jokeLengthMax).toBe(3)

    settings.toggleJokeLength(JokeLength.LARGE, false)
    expect(settings.jokeLengthMax).toBe(2)

    settings.toggleJokeLength(JokeLength.MEDIUM, false)
    expect(settings.jokeLengthMax).toBe(1)

    settings.toggleJokeLength(JokeLength.LARGE, true)
    expect(settings.jokeLengthMax).toBe(3)
  })

  test("show toast if trying to unselect too many ", () => {
    const { settings, apiStore } = createMockedRootStore({
      apiStore: {
        api: {
          categories,
        },
      },
    })
    expect(settings.anySelected).toBe(false)

    const category1 = apiStore.api.categories.get("1")
    failIfFalsy(category1)
    category1.update(true)
    expect(settings.anySelected).toBe(true)

    const category2 = apiStore.api.categories.get("2")
    failIfFalsy(category2)
    category2.update(true)
    expect(category2.isFiltered).toBe(false)
    // check for modal here ?

    category1.update(false)
    category2.update(false)
    expect(settings.anySelected).toBe(false)
  })

  test(".anySelected defaults to true", () => {
    const { settings, apiStore } = createMockedRootStore({
      apiStore: {
        api: {
          categories,
        },
      },
    })
    expect(settings.anySelected).toBe(false)

    const category = apiStore.api.categories.get("1")
    failIfFalsy(category)

    category.update(true)
    expect(settings.anySelected).toBe(true)

    category.update(false)
    expect(settings.anySelected).toBe(false)

    settings.unselectAllBlockedCategories()
    expect(settings.anySelected).toBe(false)
  })

  test(".anySelected unselects", () => {
    const { settings } = createMockedRootStore({
      apiStore: {
        api: {
          categories: Object.entries(categories).reduce((acc, ret) => {
            acc[Number(ret[0])] = { ...ret[1], isFiltered: true }
            return acc
          }, {} as Record<number, SnapshotOut<typeof CategoryModel>>),
        },
      },
    })
    expect(settings.anySelected).toBe(true)

    settings.unselectAllBlockedCategories()
    expect(settings.anySelected).toBe(false)
  })

  // test.only("can toggle ", () => {
  //   /** This functions provides a mock implementation for loading todos from the graphql endpoint. Also verifies the incoming arguments */
  //   function mockLoadTodos(query, variables) {
  //     expect(query).toMatchInlineSnapshot(`
  //                         "query todos { todos {
  //                                 __typename
  //                         id
  //                         text
  //                         complete
  //                               } }"
  //                   `)
  //     expect(variables).toEqual(undefined)
  //     return {
  //       data: {
  //         todos: [
  //           {
  //             id: "a",
  //             __typename: "Todo",
  //             complete: true,
  //             text: "Initially loaded todo, now updated",
  //           },
  //           {
  //             id: "b",
  //             __typename: "Todo",
  //             complete: false,
  //             text: "Another todo",
  //           },
  //         ],
  //       },
  //     }
  //   }

  //   /** This functions provides a mock implementation for mutating a todo. Also verifies the incoming arguments */
  //   function mockToggleTodos(query, variables) {
  //     expect(query).toMatchInlineSnapshot(`
  //         "mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
  //                 __typename
  //         id
  //         complete
  //               } }"
  //       `)
  //     expect(variables).toEqual({ id: "b" })
  //     return {
  //       data: {
  //         toggleTodo: { id: "b", __typename: "Todo", complete: true },
  //       },
  //     }
  //   }

  //   /** This test will make two following two requests */
  //   const mockResponses = [mockLoadTodos, mockToggleTodos]
  //   const mockClient = {
  //     request(query, variables) {
  //       return Promise.resolve(mockResponses.shift()?.(query, variables)) // return and remove the first mocked response
  //     },
  //   }

  //   /** Create a store with some initial state */
  //   const store = RootStore.create(
  //     {
  //       todos: {
  //         a: {
  //           id: "a",
  //           __typename: "Todo",
  //           complete: false,
  //           text: "Initially loaded todo",
  //         },
  //       },
  //     },
  //     {
  //       gqlHttpClient: mockClient,
  //     },
  //   )
  //   // use this to mock out the requests and get some integration tests in the models
  //   // https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/tests/lib/todos/todostore.test.js#L18-L110
  // })

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
