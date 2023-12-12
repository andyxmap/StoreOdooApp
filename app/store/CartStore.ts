import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { ProductCartModel,ProductCartSnapshotOut } from "app/models/Product"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CarStoreModel = types
  .model("CarStore")
  .props({
    id:"",
    products: types.array(ProductCartModel),
   
  })
  .views((store) => ({
    get total() {
      return store.products.reduce((accumulator,p)=>{
        return accumulator + p.total
      },0)
    },

    get productList(){
      return store.products.slice()
    }
    
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    addProduct(product: ProductCartSnapshotOut) {
      store.products.push(product)
    },
    removeProduct(id:any) {
      const index = store.products.findIndex((p)=>p.id===id)
      store.products.splice(index, 1);

    },
    updateProduct(id:any,product: ProductCartSnapshotOut) {
      const index = store.products.findIndex((p)=>p.id===id)
      store.products.splice(index,1,product)
    },
    initialLoad(){
      store.setProp("products",[])
    }
  }))

export interface CartStore extends Instance<typeof CarStoreModel> {}
export interface CartStoreSnapshot extends SnapshotOut<typeof CarStoreModel> {}
