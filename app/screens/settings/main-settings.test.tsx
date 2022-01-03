import { render, waitFor } from "@testing-library/react-native"
import * as React from "react"
import { RenderDefaultApp } from "test/utils"
import { MainSettingsScreen } from "./main-settings"

const RenderDefaultMainSettingsScreen = () => {
  return (
    <RenderDefaultApp>
      <MainSettingsScreen />
    </RenderDefaultApp>
  )
}

it("Buttons will open their respective sheets", async () => {
  const { getByText, getByA11yLabel, queryByA11yLabel } = render(
    <RenderDefaultMainSettingsScreen />,
  )
  const text = getByText(/categories/i).parent
  expect(text).not.toBeNull()
  const sheets = queryByA11yLabel(/action sheets/i)
  expect(sheets).toBeNull()

  await waitFor(() => getByA11yLabel(/action sheets/i))

  // fireEvent.press(text)
  // TODO: need to add mocks for the ref to ref.current?.collapse(),
})
