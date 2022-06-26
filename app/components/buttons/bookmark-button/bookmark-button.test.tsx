import { fireEvent, render, screen } from "@testing-library/react-native"
import * as React from "react"
import { BookmarkButton } from "./bookmark-button"

test("renders component", () => {
  render(<BookmarkButton bookmarked onPress={jest.fn()} />)
  expect(screen.getByTestId("bookmarks-button")).toBeTruthy()
})

test("button presses are detected", () => {
  const mockCallback = jest.fn()
  render(<BookmarkButton bookmarked onPress={mockCallback} />)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(screen.getByTestId("bookmarks-button"))
  expect(mockCallback).toBeCalledTimes(1)
})
