/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable-next-line react-native/no-inline-styles */
import { Avatar, Box, HStack, Spacer, VStack,Text } from "native-base"
import React from "react"

interface ProductCartProps{
    image:string
    name:string,
    detail:string
    stock:any,
}

export const ProductCartBlock = (props:ProductCartProps) => {

    
    return (
        <Box  borderColor="muted.900" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[1, 2]} justifyContent="space-between">
                <Avatar size="48px" source={props.image as any}/>
                <VStack>
                    
                    <Text style={{
                       color:"white"
                    }}>
                        {props.name}
                    </Text>
                    <Text  style={{
                       color:"white"
                    }}>
                        Cantidad:{props.stock}
                    </Text>
                </VStack>
                <Spacer />
                <VStack>
                <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                    $ {props.stock}
                </Text>
                </VStack>
            </HStack>
        </Box>)
}