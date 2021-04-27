import { createHttpClient } from "mst-gql"
import { RootStore } from "./RootStore"

test("can be created without any user", () => {
  const store = RootStore.create(undefined, {
    gqlHttpClient: createHttpClient(""),
  })
  expect(store).toMatchSnapshot()
})

// test("can create request", async () => {
//   /** This functions provides a mock implementation for loading todos from the graphql endpoint. Also verifies the incoming arguments */
//   function mockLoadTodos(query, variables) {
//     expect(query).toMatchInlineSnapshot(`
//                       "query todos { todos {
//                               __typename
//                       id
//                       text
//                       complete
//                             } }"
//                 `)
//     expect(variables).toEqual(undefined)
//     return {
//       data: {
//         todos: [
//           {
//             id: "a",
//             __typename: "Todo",
//             complete: true,
//             text: "Initially loaded todo, now updated"
//           },
//           {
//             id: "b",
//             __typename: "Todo",
//             complete: false,
//             text: "Another todo"
//           }
//         ]
//       }
//     }
//   }

//   /** This functions provides a mock implementation for mutating a todo. Also verifies the incoming arguments */
//   function mockToggleTodos(query, variables) {
//     expect(query).toMatchInlineSnapshot(`
//       "mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
//               __typename
//       id
//       complete
//             } }"
//     `)
//     expect(variables).toEqual({ id: "b" })
//     return {
//       data: {
//         toggleTodo: { id: "b", __typename: "Todo", complete: true }
//       }
//     }
//   }

//   /** This test will make two following two requests */
//   const mockResponses = [mockLoadTodos, mockToggleTodos]
//   const mockClient = {
//     request(query, variables) {
//       return Promise.resolve(mockResponses.shift()!(query, variables)) // return and remove the first mocked response
//     }
//   }

//   /** Create a store with some initial state */
//   const store = RootStore.create(
//     {
//       todos: {
//         a: {
//           id: "a",
//           __typename: "Todo",
//           complete: false,
//           text: "Initially loaded todo"
//         }
//       },
//     },
//     {
//       gqlHttpClient: mockClient
//     }
//   )

//   // initially, 1 todo
//   expect(store.toJSON()).toMatchSnapshot()

//   // Then, the 2 todos mocked above should be loaded and merged
//   await store.queryTodos()
//   expect(store.todos.size).toBe(2)
//   expect(store.todos.get("a").text).toBe("Initially loaded todo, now updated")

//   const todoB = store.todos.get("b")
//   expect(todoB.text).toBe("Another todo")
//   expect(todoB.complete).toBe(false)

//   // Finally, also toggle a todo
//   await todoB.toggle()
//   expect(todoB.complete).toBe(true)

//   const store = RootStore.create(undefined, {
//     gqlHttpClient: createHttpClient(""),
//   })
// })
