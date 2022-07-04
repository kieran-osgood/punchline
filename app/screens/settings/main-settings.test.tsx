import { render, screen, waitFor } from "@testing-library/react-native"
import * as React from "react"
import { RenderDefaultApp } from "test/utils/components"
import { MainSettingsScreen } from "./main-settings"

const RenderDefaultMainSettingsScreen = () => {
  return (
    <RenderDefaultApp>
      <MainSettingsScreen />
    </RenderDefaultApp>
  )
}

it("Buttons will open their respective sheets", async () => {
  render(<RenderDefaultMainSettingsScreen />)
  const text = screen.getByText(/categories/i).parent
  expect(text).not.toBeNull()
  const sheets = screen.queryByLabelText(/action sheets/i)
  expect(sheets).toBeNull()

  await waitFor(() => screen.getByLabelText(/action sheets/i))

  // fireEvent.press(text)
  // TODO: need to add mocks for the ref to ref.current?.collapse(),
})
