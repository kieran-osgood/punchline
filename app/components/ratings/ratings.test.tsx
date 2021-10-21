import { render } from "@testing-library/react-native"
import * as React from "react"
import { Ratings } from "./ratings"

test("likes and dislikes are placed as text on the screen correctly", () => {
  const { getByText } = render(<Ratings likes={5} dislikes={999} />)

  getByText("5")
  getByText("999")
})

test("if props are undefined render 0", () => {
  const { getAllByText } = render(<Ratings likes={undefined} dislikes={undefined} />)

  expect(getAllByText("0")).toHaveLength(2)
})
