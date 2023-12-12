import { AddCart} from "./types";
import { api } from "../api";
import { CommonResult } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";

export async function getCart():Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiGetWrapper<CommonResult>(
        "/sale/cart",
        undefined
    )
    return response
}

export async function add2Cart(data:AddCart):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/sale/cart",
        {
            jsonrpc:"2.0",
            params:data
        }
    )
    return response
}

export async function modifyCart(data:AddCart):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/sale/cart/update",
        {
            jsonrpc:"2.0",
            params:data
        },
        true
    )
    return response
}






