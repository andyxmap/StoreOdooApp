export interface ProductListParams {
  page: number
  take: number
  categ_name?: string
  name?:string
}

export interface Product {
  id:                      number;
  name:                    string;
  description_sale:        boolean;
  categ_name:              string;
  logo_url:                string;
  list_price:              number;
  currency_id:             Array<number | string>;
  price_in_eur:            number;
  price_in_usd:            number;
  alternative_product_ids: any[];
  qty_available:           number;
  product_attrs:           any[];
  product_images:          any[];
}


