import * as React from "react"
import { render } from "@testing-library/react-native"
import { Icon } from "./icon"

test("renders", () => {
  render(<Icon icon="back" />)
})
