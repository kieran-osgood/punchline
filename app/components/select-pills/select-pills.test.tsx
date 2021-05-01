import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { SelectPills, SelectPillsProps } from "./select-pills"
import * as faker from "faker"

const zeroItems: SelectPillsProps["data"] = []
const tenItems: SelectPillsProps["data"] = new Array(10).fill(0).map(() => ({
  id: faker.datatype.uuid(),
  isActive: faker.datatype.boolean(),
  name: faker.name.findName(),
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

  // expect(buttons).toMatchInlineSnapshot('')
})

test.only("correct values passed to parent 'onValueChange' callback", () => {
  const onValueChange = jest.fn()
  const data = tenItems
  const { getByText } = render(<SelectPills {...{ data, onValueChange }} />)

  const button = getByText(tenItems[1].name)
  fireEvent.press(button)
  expect(onValueChange).toBeCalledWith({
    id: tenItems[1].id,
    isActive: !tenItems[1].isActive,
    name: tenItems[1].name,
  })
})
