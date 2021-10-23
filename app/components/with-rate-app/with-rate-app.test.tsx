import { render, waitFor } from "@testing-library/react-native"
import { RootStore, UserStoreModel } from "app/models"
import { RootStoreProvider } from "app/models/root-store/root-store-context"
import { advanceTo, clear } from "jest-date-mock"
import { getSnapshot, types } from "mobx-state-tree"
import * as React from "react"
import InAppReview from "react-native-in-app-review"
import { ViewProps } from "react-native-ui-lib"
import withRateApp from "./with-rate-app"

// to avoid race conditions between expected and actual date values
beforeAll(() => {
  advanceTo(new Date("1994-10-23"))
})

afterAll(() => {
  clear()
})

const TestWithRateAppComponent = withRateApp<ViewProps>(TestChildComponent)

const renderDefaultApp = (rootStore: RootStore) => {
  return (
    <RootStoreProvider value={rootStore}>
      <TestWithRateAppComponent accessibilityLabel="a11y label" />
    </RootStoreProvider>
  )
}

describe("Validate withRateApp side effects", () => {
  it("withRateApp will wrap and return child passing props", () => {
    const rootStore = createRootStore({})
    const { getByA11yLabel } = render(renderDefaultApp(rootStore))
    getByA11yLabel(/a11y label/i)
  })

  it("withRateApp resets goodJokeCount and sets lastDisplayedReviewPrompt to now", async () => {
    const rootStore = createRootStore({
      userStore: getSnapshot(
        types
          .optional(UserStoreModel, {
            onboardingComplete: false,
            goodJokeCount: 35,
            lastDisplayedReviewPrompt: new Date("2021-10-23"),
          })
          .create(),
      ),
    })
    expect(rootStore.userStore.goodJokeCount).toEqual(35)

    render(renderDefaultApp(rootStore))

    const spy = jest.spyOn(InAppReview, "isAvailable").mockImplementation(() => true)
    const spy2 = jest
      .spyOn(InAppReview, "RequestInAppReview")
      .mockImplementation(() => Promise.resolve(true))

    //   const result = await InAppReview.isAvailable()

    spy.mockRestore()
    spy2.mockRestore()

    await waitFor(() => {
      expect(rootStore.userStore.goodJokeCount).toEqual(0)
      expect(rootStore.userStore.lastDisplayedReviewPrompt).toEqual(new Date("1994-10-23"))
    })
  })
})
