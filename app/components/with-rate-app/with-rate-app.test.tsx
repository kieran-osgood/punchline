import { render, screen, waitFor } from "@testing-library/react-native"
import { RootStore, UserStoreModel } from "app/models"
import { RootStoreProvider } from "app/models/root-store/root-store-context"
import { advanceTo, clear } from "jest-date-mock"
import { getSnapshot, types } from "mobx-state-tree"
import * as React from "react"
import InAppReview from "react-native-in-app-review"
import { ViewProps } from "react-native-ui-lib"
import { createMockedRootStore, TestChildComponent } from "test/utils/components"
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
    const rootStore = createMockedRootStore({})
    render(renderDefaultApp(rootStore))
    screen.getByLabelText(/a11y label/i)
  })

  it("withRateApp resets goodJokeCount and sets lastDisplayedReviewPrompt to now", async () => {
    const rootStore = createMockedRootStore({
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

    const spyIsAvailable = jest.spyOn(InAppReview, "isAvailable").mockImplementation(() => true)
    const spyRequestInAppReview = jest
      .spyOn(InAppReview, "RequestInAppReview")
      .mockImplementation(() => Promise.resolve(true))

    //   const result = await InAppReview.isAvailable()

    spyIsAvailable.mockRestore()
    spyRequestInAppReview.mockRestore()

    await waitFor(() => {
      expect(rootStore.userStore.goodJokeCount).toEqual(0)
      expect(rootStore.userStore.lastDisplayedReviewPrompt).toEqual(new Date("1994-10-23"))
    })
  })
})
