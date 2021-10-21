import { fireEvent, render } from "@testing-library/react-native"
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
  const { getByText } = render(
    <SubSlide {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />,
  )
  getByText(mock.description)
  getByText(mock.subtitle)
})

test("onPress handlers are called on both types of button", () => {
  const onPress = jest.fn()
  const { rerender, getByText, queryByText } = render(
    <SubSlide {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />,
  )
  const nextButton = getByText(buttonText1)
  fireEvent.press(nextButton)
  expect(onPress).toHaveBeenCalledTimes(1)

  rerender(
    <SubSlide last {...{ subtitle: mock.subtitle, description: mock.description, onPress }} />,
  )
  expect(queryByText(buttonText1)).toBeNull()
  const lastButton = getByText(buttonText2)
  fireEvent.press(lastButton)
  expect(onPress).toHaveBeenCalledTimes(2)
})
