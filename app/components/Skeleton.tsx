import { Center, HStack, Skeleton, VStack } from "native-base";
import React from "react";

export const SkeletonProducts = () => {
    return <Center w="100%" h="100%">
        <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
        borderColor: "white.500"
      }} _light={{
        borderColor: "white.200"
      }} p="4">
          <Skeleton flex="1" h="150" rounded="md" startColor="red.100" />
          <VStack flex="3" space="4">
            <Skeleton startColor="red.900" />
            <Skeleton.Text />
            <HStack space="2" alignItems="center">
              <Skeleton size="5" rounded="full" />
              <Skeleton h="3" flex="2" rounded="full" />
              <Skeleton h="3" flex="1" rounded="full" startColor="red.900" />
            </HStack>
            <HStack space="2" alignItems="center">
              <Skeleton size="5" rounded="full" startColor="red.900"/>
              <Skeleton h="3" flex="2" rounded="full" />
              <Skeleton h="3" flex="1" rounded="full"  />
            </HStack>
            <HStack space="2" alignItems="center">
              <Skeleton size="5" rounded="full" />
              <Skeleton h="3" flex="2" rounded="full" startColor="red.900"/>
              <Skeleton h="3" flex="1" rounded="full"  />
            </HStack>
          </VStack>
        </HStack>
      </Center>;
  };