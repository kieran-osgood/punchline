import { UserJokeHistoryModelType } from "app/graphql"
import { RootStoreModel } from "app/models"

const getUserJokeHistoryStore = () => {
  const rootStore = RootStoreModel.create()
  return rootStore.apiStore.userJokeHistoryApi
}

describe("", () => {
  test("can be created", () => {
    const store = getUserJokeHistoryStore()
    expect(store).toBeTruthy()
  })

  test("bookmark jokes sorts by date", () => {
    const store = getUserJokeHistoryStore()
    let prevItem: UserJokeHistoryModelType | null = null

    for (let i = 0; i < store.bookmarkedJokes.length; i++) {
      expect(Number(store.bookmarkedJokes[i].createdAt)).toBeGreaterThan(
        Number(prevItem?.createdAt ?? 0),
      )
      prevItem = store.bookmarkedJokes[i]
    }
  })

  test("bookmark jokes filters on bookmarked", () => {
    const store = getUserJokeHistoryStore()
    let prevItem: UserJokeHistoryModelType | null = null

    for (let i = 0; i < store.historyJokes.length; i++) {
      expect(Number(store.historyJokes[i].createdAt)).toBeGreaterThan(
        Number(prevItem?.createdAt ?? 0),
      )
      prevItem = store.historyJokes[i]
    }
  })

  // test("history sorts by date", () => {
  //   const store = getUserJokeHistoryStore()
  // })

  // test("fetchUserJokeHistory correctly passes variables through", () => {
  //   const store = getUserJokeHistoryStore()
  // })
})
