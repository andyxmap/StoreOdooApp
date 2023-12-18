export interface AddCart {
  product_id: number
  quantity: number
  attributes: any
}

export interface LineCart{
  
    line_id: number,
    quantity: number

}
export interface CartPost {
  line_id:      number;
  quantity:     number;
  warning:      string;
  minor_amount: number[];
  amount:       number;
  cart_id:      number;
  message:      string;
}
