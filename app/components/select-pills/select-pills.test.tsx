import { fireEvent, render } from "@testing-library/react-native"
import * as faker from "faker"
import * as React from "react"
import { getAccessibilityHint, SelectPills, SelectPillsProps } from "./select-pills"

const zeroItems: SelectPillsProps["data"] = []
const tenItems: SelectPillsProps["data"] = new Array(10).fill(0).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  isActive: faker.datatype.boolean(),
}))

test("renders correct amount of elements", () => {
  const onValueChange = jest.fn()
  let data = zeroItems
  const { queryAllByA11yLabel, getAllByA11yLabel, rerender } = render(
    <SelectPills {...{ data, onValueChange }} />,
  )

  expect(queryAllByA11yLabel(/category button/i)).toHaveLength(0)

  data = tenItems
  rerender(<SelectPills {...{ data, onValueChange }} />)
  const buttons = getAllByA11yLabel(/category button/i)
  expect(buttons).toHaveLength(10)
})

test("correct values passed to parent 'onValueChange' callback", async () => {
  const data = tenItems.map((item) => ({ ...item }))
  const [item] = data
  const onValueChange = jest.fn(() => (item.isActive = !item.isActive))

  const { getByA11yHint } = render(<SelectPills {...{ data, onValueChange }} />)
  const button = getByA11yHint(getAccessibilityHint(item))

  // Y: fireEvent.press(button) will mutate item.isActive
  const stateBeforePress = item.isActive
  fireEvent.press(button)
  expect(onValueChange).toBeCalledWith({ ...item, isActive: !stateBeforePress })
})

test("Changing data rerenders buttons and can toggle on/off", async () => {
  const data = tenItems.map((item) => ({ ...item }))
  const [item] = data
  const onValueChange = jest.fn(() => (item.isActive = !item.isActive))

  const { rerender, getByA11yHint } = render(<SelectPills {...{ data, onValueChange }} />)
  const button = getByA11yHint(getAccessibilityHint(item))

  // Y: fireEvent.press(button) will mutate item.isActive
  let stateBeforePress = item.isActive
  fireEvent.press(button)
  let message = getAccessibilityHint(item)
  expect(onValueChange).toBeCalledWith({ ...item, isActive: !stateBeforePress })
  rerender(<SelectPills {...{ onValueChange }} data={data.map((x) => ({ ...x }))} />)
  expect(getByA11yHint(message))

  // Ensure we can toggle the button back to original state
  stateBeforePress = item.isActive
  fireEvent.press(button)
  message = getAccessibilityHint(item)
  expect(onValueChange).toBeCalledWith({ ...item, isActive: !stateBeforePress })
  rerender(<SelectPills {...{ onValueChange }} data={data.map((x) => ({ ...x }))} />)
  expect(getByA11yHint(message))
})
