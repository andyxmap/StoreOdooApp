import { Divider } from "native-base"
import React from "react"

export const CustomDivider = ()=>{
    return (
        <Divider _light={{
            bg: "red.800"
          }} _dark={{
            bg: "red.900"
          }} ></Divider>
    )
}