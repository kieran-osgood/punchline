import { afterAll, afterEach, beforeAll } from "@jest/globals"
import { server } from "./msw/server"

// Establish API mocking before all tests.
beforeAll(() => {
  // required to implement fetch within node tests
  global.fetch = require("node-fetch")

  server.listen({
    onUnhandledRequest: "bypass",
  })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
