import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { translate } from "../i18n"
import { login as loginApi,logout as logoutApi } from "./../services/api/account/service"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
    userInfo: {
      name: "",
      lastname: "",
      lang: "",
      currency_id: 0,
      address_id: 0,
      userid: 0,
    } as any,
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return translate("fieldsValidation.blank")
      if (store.authEmail.length < 6) return translate("fieldsValidation.min", { min: "6" })
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return translate('errors.invalidEmail')
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      logoutApi().then((_)=>{
        store.authToken = undefined
        store.authEmail = ""
        store.authPassword = ""
      })

    },
    userLogin() {
      return loginApi({
        email: store.authEmail,
        password: store.authPassword,
      })
    },
    setUserInfo(value:any){
           store.userInfo = value
    }
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
