import { render, screen } from "@testing-library/react-native"
import * as React from "react"
import { LoadingModal } from "./loading-modal"

const activityIndicatorA11yLabel = /Loading Modal/i
test("LoadingModal hides itself if loading prop is false", () => {
  render(<LoadingModal loading={false} />)

  expect(screen.queryByLabelText(activityIndicatorA11yLabel)).toBeNull()

  screen.rerender(<LoadingModal />)

  expect(screen.getByLabelText(activityIndicatorA11yLabel)).not.toBeNull()
})
