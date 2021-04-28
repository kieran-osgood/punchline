import { fireEvent, render } from "@testing-library/react-native"
import { accessibilityLabel } from "app/components/bookmark-button/bookmark-button"
import * as React from "react"
import { Controls } from "./controls"

test("control buttons render and all button events are registered", () => {
  const mockBookmarkPress = jest.fn()
  const mockUpVotePress = jest.fn()
  const mockDownVotePress = jest.fn()
  const mockSkipPress = jest.fn()
  const { getByA11yLabel } = render(
    <Controls
      bookmarked
      onBookmarkPress={mockBookmarkPress}
      onUpVotePress={mockUpVotePress}
      onDownVotePress={mockDownVotePress}
      onSkipPress={mockSkipPress}
    />,
  )
  const controls = getByA11yLabel(/Joke rating controls/i)

  expect(mockBookmarkPress).toBeCalledTimes(0)
  expect(mockUpVotePress).toBeCalledTimes(0)
  expect(mockDownVotePress).toBeCalledTimes(0)
  expect(mockSkipPress).toBeCalledTimes(0)

  const bookmarkButton = getByA11yLabel(accessibilityLabel)
  fireEvent.press(bookmarkButton)
  expect(mockBookmarkPress).toBeCalledTimes(1)

  const upVoteButton = getByA11yLabel(/Laughing emoji face/i)
  fireEvent.press(upVoteButton)
  expect(mockUpVotePress).toBeCalledTimes(1)

  const downVoteButton = getByA11yLabel(/Crying emoji face/i)
  fireEvent.press(downVoteButton)
  expect(mockDownVotePress).toBeCalledTimes(1)

  const skipButton = getByA11yLabel(/Skip to next joke arrow/i)
  fireEvent.press(skipButton)
  expect(mockSkipPress).toBeCalledTimes(1)
})
