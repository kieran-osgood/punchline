import * as React from "react"
import { BookmarkButton, accessibilityLabel } from "./bookmark-button"
import { fireEvent, render } from "@testing-library/react-native"

test("renders component", () => {
  const { getByA11yLabel } = render(<BookmarkButton bookmarked onPress={jest.fn()} />)
  expect(getByA11yLabel(accessibilityLabel)).toBeTruthy()
})

test("button presses are detected", () => {
  const mockCallback = jest.fn()
  const { getByA11yLabel } = render(<BookmarkButton bookmarked onPress={mockCallback} />)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(getByA11yLabel(accessibilityLabel))
  expect(mockCallback).toBeCalledTimes(1)
})
