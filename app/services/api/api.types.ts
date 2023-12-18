/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface Result{
  code:string,
  message:string
}

export interface CommonResult{
  id:any,
  jsonrpc:string
  error?:Result,
  result:Result
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface PaginateResponse<T> {
  items: T[];
  meta:  Meta;
}

export interface CommonItem {
  id:          number;
  name:        string;
  parent_path: string;
  sequence:    number;
  logo_url:    string;
}

export interface Meta {
  page:            number;
  take:            number;
  itemCount:       number;
  pageCount:       number;
  hasPreviousPage: boolean;
  hasNextPage:     boolean;
}


export interface ResultClass<T> {
  jsonrpc: string;
  id:      null;
  result:  T;
}

