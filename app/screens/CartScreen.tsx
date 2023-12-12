/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { ListView, Screen, Text } from "app/components"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { delay } from "app/utils/delay"
import { useBackHeader } from "app/hooks/customHeader"
import { colors } from "app/theme"
import { Button, Center, VStack } from "native-base"
import { ProductCartBlock } from "app/components/ProductCartBlock"
import { SkeletonProducts } from "app/components/Skeleton"
import { useStores } from "app/store"
import { ProductCartSnapshotOut } from "app/models/Product"
import { CustomDivider } from "app/components/CustomDivider"
import { Swipable } from "app/components/ProductSwipable"



interface CartScreenProps extends AppStackScreenProps<"Cart"> {}


export const CartScreen: FC<CartScreenProps> = observer(function CartScreen(_props) {
  
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    cartStore
  } = useStores()

  useBackHeader()
  async function load() {
    setIsLoading(true)
    
    await Promise.all([delay(750),delay(750)])
    setIsLoading(false)
  }
  useEffect(() => {
    console.log(cartStore.productList) 
      load()
  },[])
  
  return (
    <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
      >
        <ListView<ProductCartSnapshotOut>
          ItemSeparatorComponent={CustomDivider}
          contentContainerStyle={$listContentContainer}
          data={cartStore.productList}
          estimatedItemSize={177}
          ListEmptyComponent={
              <Center flex={1} height="full">
                 <SkeletonProducts />
              </Center> 
          }
          ListHeaderComponent={
            <View style={$heading}>
              <VStack>
              <Text preset="heading" tx="cartScreen.title" style={{
                color:"white"
              }} />
              <Button bg="red.900">Finalizar pedido</Button>
              </VStack>
            </View>
          }
          renderItem={({ item }) => (
            <Swipable>
              <ProductCartBlock
            image={item.image}
            name={item.name}
            detail={item.name}
            stock={item.quantity}
            />
            </Swipable>
          )}
        />
      </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.secondary
 
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}