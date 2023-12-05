/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { delay } from "app/utils/delay"
import { OrderBlock } from "app/components/OrderBlock"
import { useCartHeader } from "app/hooks/customHeader"
import { colors } from "app/theme"
import { Divider } from "native-base"



interface OrdersScreenProps extends AppStackScreenProps<"Orders"> {}

const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "Orden #",
  timeStamp: "12:47 PM",
  recentText: "Productos ordenados:  10",
  avatarUrl: require('../../assets/images/order.png')
}];

export const OrdersScreen: FC<OrdersScreenProps> = observer(function OrdersScreen(_props) {
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [orders, setOrders] = React.useState(data)

  useCartHeader(_props.navigation)
  async function load() {
    setIsLoading(true)
    for(let i = 0 ; i < 10 ; i++){
      data.push(data[0]);
    }
    setOrders([...data])
    await Promise.all([delay(750),delay(750)])
    setIsLoading(false)
  }
  useEffect(() => {
      load()
  },[])
  
  return (
    <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
      >
        <ListView
          ItemSeparatorComponent={Divider}
          contentContainerStyle={$listContentContainer}
          data={orders}
          estimatedItemSize={177}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <EmptyState
                preset="generic"
                style={$emptyState}
                headingTx={
                  "demoPodcastListScreen.noFavoritesEmptyState.heading"
                  
                }
                contentTx={
                  
                    "demoPodcastListScreen.noFavoritesEmptyState.content"
                    
                }
                imageStyle={$emptyStateImage}
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="orderScreen.title" style={{
                color:"white"
              }} />
            </View>
          }
          renderItem={({ item }) => (
            <OrderBlock
            avatarUrl={item.avatarUrl}
            fullName={item.fullName}
            timeStamp={item.timeStamp}
            recentText={item.recentText}
            />
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