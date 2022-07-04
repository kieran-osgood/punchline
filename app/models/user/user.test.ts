import { UserData, UserModel } from "./user"

test("Can be created and matches default user data", () => {
  const instance = UserModel.create(UserData)
  expect(instance).toMatchSnapshot()
})
