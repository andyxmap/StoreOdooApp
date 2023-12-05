import { CategoryModel } from "./Category"

test("can be created", () => {
  const instance = CategoryModel.create({})

  expect(instance).toBeTruthy()
})
