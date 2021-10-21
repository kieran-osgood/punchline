import { render } from "@testing-library/react-native"
import * as React from "react"
import { LoadingModal } from "./loading-modal"

const activityIndicatorA11yLabel = /Loading Modal/i
test("LoadingModal hides itself if loading prop is false", () => {
  const { rerender, getByA11yLabel, queryByA11yLabel } = render(<LoadingModal loading={false} />)

  expect(queryByA11yLabel(activityIndicatorA11yLabel)).toBeNull()

  rerender(<LoadingModal />)

  expect(getByA11yLabel(activityIndicatorA11yLabel)).not.toBeNull()
})
