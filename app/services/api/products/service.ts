import { ProductListParams} from "./types";
import { api } from "../api";
import { CommonResult } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";

export async function productList(params:ProductListParams):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiGetWrapper<CommonResult>(
        "/products",
        params
    )
    return response
}

export async function searchProducts(params:ProductListParams):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiGetWrapper<CommonResult>(
        "/products/search",
        params
    )
    return response
}

export async function productDetail(id:number|string):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiGetWrapper<CommonResult>(
        `/product/${id}`,
        null
    )
    return response
}






