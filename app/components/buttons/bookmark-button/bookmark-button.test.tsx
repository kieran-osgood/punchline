import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { BookmarkButton } from "./bookmark-button"

test("renders component", () => {
  const { getByTestId } = render(<BookmarkButton bookmarked onPress={jest.fn()} />)
  expect(getByTestId("bookmarks-button")).toBeTruthy()
})

test("button presses are detected", () => {
  const mockCallback = jest.fn()
  const { getByTestId } = render(<BookmarkButton bookmarked onPress={mockCallback} />)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(getByTestId("bookmarks-button"))
  expect(mockCallback).toBeCalledTimes(1)
})
