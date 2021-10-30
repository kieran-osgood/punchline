import { render } from "@testing-library/react-native"
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

it("Buttons will open their respective sheets", () => {
  const { getByText } = render(<RenderDefaultMainSettingsScreen />)
  const text = getByText(/categories/i).parent
  // expect(text).not.toBeNull()
  // fireEvent.press(text)
  // TODO: need to add mocks for the ref to ref.current?.collapse(),
})
