import { withSetPropAction } from "app/store/helpers/withSetPropAction";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";


export const ProductModel = types
  .model("Product")
  .props({
    guid: types.identifier,
    title: "",
    pubDate: "", // Ex: 2022-08-12 21:05:36
    description: "",
    price: "",
    stock: 0,
    image:""
  })
  .actions(withSetPropAction)

  export const ProductCartModel = types
  .model("ProductCart")
  .props({
    id: types.string,
    name: types.string,
    price: types.number,
    quantity: types.number,
    image:types.number,
    firstTime: types.boolean

  })
  .actions(withSetPropAction)
  .views((product)=>({
    get total() {
      return product.price * product.quantity
    }
  }))


export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}

export interface ProductCart extends Instance<typeof ProductCartModel> {}
export interface ProductCartSnapshotOut extends SnapshotOut<typeof ProductCartModel> {}

