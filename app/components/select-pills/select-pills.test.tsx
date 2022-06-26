import { fireEvent, render, screen } from "@testing-library/react-native"
import * as faker from "faker"
import * as React from "react"
import { getAccessibilityHint, SelectPills, SelectPillsProps } from "./select-pills"

const zeroItems: SelectPillsProps["data"] = []
const tenItems: () => SelectPillsProps["data"] = () =>
  new Array(10).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    isActive: faker.datatype.boolean(),
  }))

test("renders correct amount of elements", () => {
  const onValueChange = jest.fn()

  render(<SelectPills data={zeroItems} onValueChange={onValueChange} />)
  expect(screen.queryAllByLabelText(/category button/i)).toHaveLength(0)

  screen.rerender(<SelectPills data={tenItems()} onValueChange={onValueChange} />)
  expect(screen.queryAllByLabelText(/category button/i)).toHaveLength(10)
})

test("correct values passed to parent 'onValueChange' callback", async () => {
  const data = tenItems()
  const [item] = data
  const onValueChange = jest.fn(() => (item.isActive = !item.isActive))

  render(<SelectPills {...{ data, onValueChange }} />)
  const button = screen.getByA11yHint(getAccessibilityHint(item))

  // Y: fireEvent.press(button) will mutate item.isActive
  const stateBeforePress = item.isActive
  fireEvent.press(button)
  expect(onValueChange).toBeCalledWith({ ...item, isActive: !stateBeforePress })
})

test("Changing data rerenders buttons and can toggle on/off", async () => {
  const data = tenItems()
  const [firstItem] = data
  const originalFirstItem = { ...firstItem }
  const onValueChange = jest.fn(() => (firstItem.isActive = !firstItem.isActive))

  render(<SelectPills {...{ data, onValueChange }} />)

  let button = screen.getByA11yHint(getAccessibilityHint(firstItem))
  // Y: fireEvent.press(button) will mutate item.isActive
  fireEvent.press(button)
  expect(onValueChange).toBeCalledWith({
    ...originalFirstItem,
    isActive: !originalFirstItem.isActive,
  })
  expect(onValueChange).toBeCalledTimes(1)

  screen.rerender(<SelectPills {...{ onValueChange }} data={data.map((x) => ({ ...x }))} />)
  // Ensure we can toggle the button back to original state
  button = screen.getByA11yHint(getAccessibilityHint(firstItem))
  fireEvent.press(button)
  expect(onValueChange).toBeCalledWith(originalFirstItem)

  expect(onValueChange).toBeCalledTimes(2)
})
