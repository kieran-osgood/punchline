import { fireEvent, render, screen } from "@testing-library/react-native"
import * as React from "react"
import { SubSlide } from "./sub-slide"

const mock = {
  subtitle: "A subtitle",
  description: "My description",
  last: false,
}

const buttonText1 = /Next/i
const buttonText2 = /Let's get started/i

test("Subtitle and descrption is visible", () => {
  const onPress = jest.fn()
  render(<SubSlide {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />)
  screen.getByText(mock.description)
  screen.getByText(mock.subtitle)
})

test("onPress handlers are called on both types of button", () => {
  const onPress = jest.fn()
  render(<SubSlide {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />)
  const nextButton = screen.getByText(buttonText1)
  fireEvent.press(nextButton)
  expect(onPress).toHaveBeenCalledTimes(1)

  screen.rerender(
    <SubSlide last {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />,
  )
  expect(screen.queryByText(buttonText1)).toBeNull()
  const lastButton = screen.getByText(buttonText2)
  fireEvent.press(lastButton)
  expect(onPress).toHaveBeenCalledTimes(2)
})
