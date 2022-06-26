import { render, screen } from "@testing-library/react-native"
import * as React from "react"
import { Ratings } from "./ratings"

test("likes and dislikes are placed as text on the screen correctly", () => {
  render(<Ratings likes={5} dislikes={999} />)

  screen.getByText("5")
  screen.getByText("999")
})

test("if props are undefined render 0", () => {
  render(<Ratings likes={undefined} dislikes={undefined} />)

  expect(screen.getAllByText("0")).toHaveLength(2)
})
