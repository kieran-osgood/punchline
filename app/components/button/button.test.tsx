import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { Button } from "./button"

const accessibilityLabel = "a test buttonw"

test("button is rendered with a11y label", () => {
  const { getByA11yLabel } = render(<Button {...{ accessibilityLabel }} onPress={jest.fn()} />)
  getByA11yLabel(accessibilityLabel)
})

test("onPress is called when not disabled, and doesn't when disabled", () => {
  let mockCallback = jest.fn()
  let disabled = false

  const { getByA11yLabel, rerender } = render(
    <Button {...{ accessibilityLabel, disabled }} onPress={mockCallback} />,
  )
  getByA11yLabel(accessibilityLabel)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(getByA11yLabel(accessibilityLabel))
  expect(mockCallback).toBeCalledTimes(1)

  disabled = true
  mockCallback = jest.fn()
  rerender(<Button {...{ accessibilityLabel, disabled }} onPress={mockCallback} />)

  expect(mockCallback).toBeCalledTimes(0)
  fireEvent.press(getByA11yLabel(accessibilityLabel))
  expect(mockCallback).toBeCalledTimes(0)
})
