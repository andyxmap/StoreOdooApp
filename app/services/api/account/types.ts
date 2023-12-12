export interface UserSignup {
  email: string
  password: string
  confirm_password: string
  name: string
  lastname: string
  lang: string
}

export interface UserSignin {
  email: string
  password: string
}

export interface UserProfile {
  name: string
  lastname: string
  email: string
  lang: string
  tz: string
  currency_id: number
  identification_doc_type_id: number
  identification_doc_number: string
  address: Address
}

export interface Address {
  street: string
  street2: string
  _zip: string
  country_id: number
  state_id: number
  municipality_id: number
  city: string
  phone: string
  mobile: string
}
