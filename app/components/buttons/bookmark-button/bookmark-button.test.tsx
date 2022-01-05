import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { accessibilityLabel, BookmarkButton } from "./bookmark-button"

test.only("renders component", () => {
  const { getByA11yLabel, debug } = render(<BookmarkButton bookmarked onPress={jest.fn()} />)
  debug()

  expect(getByA11yLabel("123")).toBeTruthy()
})

test("button presses are detected", () => {
  const mockCallback = jest.fn()
  const { getByA11yLabel } = render(<BookmarkButton bookmarked onPress={mockCallback} />)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(getByA11yLabel(accessibilityLabel))
  expect(mockCallback).toBeCalledTimes(1)
})
