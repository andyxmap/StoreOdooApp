/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { useBackHeader } from "app/hooks/customHeader"
import { ProductBlock } from "app/components/Product"
import { Box, View } from "native-base"
import { colors, spacing } from "app/theme"
import { ContentStyle } from "@shopify/flash-list"
import { SkeletonProducts } from "app/components/Skeleton"
import { ProductSnapshotOut } from "app/models/Product"
import { useStores } from "app/store"


// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProductsScreenProps extends AppStackScreenProps<"Products"> { }

const ahumados = require("../../assets/images/ahumado.jpg")


const productos = [
  {
    id: 1,
    title: 'Productos ahumados',
    image: ahumados,
    stock: 10,
    price: "1000",
    description: "Nuestro filete de ternera premium: jugoso, tierno y delicioso.Seleccionado cuidadosamente de los mejores ranchos, este corte de carne de calidad excepcional ofrece una experiencia culinaria única.",
    guid: "1000",
    pubDate: ""
  } as ProductSnapshotOut
];

export const ProductsScreen: FC<ProductsScreenProps> = observer(function ProductsScreen(_props) {

  useBackHeader()

  const { navigation } = _props
  const [isLoading, setIsLoading] = React.useState(false)

  const [data, setData] = React.useState(productos)
  const {
    cartStore: { addProduct },
  } = useStores()


  async function load() {
    setIsLoading(true)
    const newData = []
    for (let i = 0; i < 100; i++) {
      newData.push(data[0]);
    }
    setData([...newData])

  }

  async function onPress(product: ProductSnapshotOut) {
    navigation.navigate("ProductDetail", {
      product,
      categoryName: "Productos ahumados"

    })
  }

  async function onPressCart(product: ProductSnapshotOut) {
    console.log(product.image)
    console.log(
      {
        id: product.guid,
        name: product.title,
        price: Number.parseFloat(product.price),
        quantity: 1,
        image: ahumados,
        firstTime: true
      }
    )
    addProduct(
      {
        id: product.guid,
        name: product.title,
        price: Number.parseFloat(product.price),
        quantity: 1,
        image: product.image,
        firstTime: true
      }
    )
  }
  useEffect(() => {

    load().then(() => { console.log() })

  }, [])

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
    >
      <ListView<ProductSnapshotOut>
        contentContainerStyle={$listContentContainer}
        data={data}
        estimatedItemSize={177}
        ListEmptyComponent={
          isLoading ? (
            <SkeletonProducts />
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
            <Text preset="heading" tx="productScreen.title" style={{
              color: "white"
            }} />
          </View>
        }
        renderItem={({ item }) => (
          <Box marginBottom="5">
            <ProductBlock
              key={item.id}
              product={item}
              onPress={onPress}
              onPressCart={onPressCart}
            />
          </Box>
        )}
      />
    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,

}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
  backgroundColor: colors.palette.secondary
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
