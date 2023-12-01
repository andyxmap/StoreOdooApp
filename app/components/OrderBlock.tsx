import { Avatar, Box, HStack, Spacer, VStack } from "native-base"
import { Text } from "./Text"
import React from "react"

interface OrderBlockProps{
    avatarUrl:string
    fullName:string,
    timeStamp:any,
    recentText:string
}

export const OrderBlock = (props:OrderBlockProps) => {

    
    return (
        <Box borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
        }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[1, 2]} justifyContent="space-between">
                <Avatar size="48px" source={props.avatarUrl}/>
                <VStack>
                    <Text>
                        {props.fullName}
                    </Text>
                    <Text>
                        {props.recentText}
                    </Text>
                </VStack>
                <Spacer />
                <Text >
                    {props.timeStamp}
                </Text>
            </HStack>
        </Box>)
}