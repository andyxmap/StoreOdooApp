import { GeneralApiProblem } from "app/services/api/apiProblem";
import { Alert, HStack, VStack, Text,useToast } from "native-base";
import React from "react"

interface ToastAlertProps {
    status : string
    variant: "solid"|"outline",
    title: string,
    description: string,
}

interface ToastShowProps{
    
title: string,
variant: "solid"|"outline",
description: string
      
}
export const ToastAlert = ({
    status,
    variant,
    title,
    description,
    ...rest
  }: ToastAlertProps) => <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status} variant={variant} {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title}
            </Text>
          </HStack>
        </HStack>
        <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
          {description}
        </Text>
      </VStack>
    </Alert>

export function useToastErrorApi(){

     const toast = useToast()
     
     function showToastApiError(value:GeneralApiProblem){
        const info:ToastShowProps = {
            variant: "outline",
            title: "Resultado Inesperado",
            description: value.kind
         }
        toast.show({
         render: (props)=>{
             return <ToastAlert {...info} {...props}/>
         }
      })
    }

    return {showToastApiError}
}

export function useToastCustom(){

    const toast = useToast()
    function showToast(value:ToastShowProps){
           toast.show({
            render: (props)=>{
                return <ToastAlert {...value} {...props}/>
            }
         })
    }

    return {showToast}
}